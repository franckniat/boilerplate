"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormMessage, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { authClient, getErrorMessage } from "@/lib/auth-client";
import { toast } from "sonner";
import { forgotPasswordSchema, ForgotPasswordSchema } from "@/schemas/user";
import { useRouter } from "next/navigation";
import z from "zod";
import { getUserByEmail } from "@/actions/user";

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const form = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        }
    })
    const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
        startTransition(async () => {
            const user = await getUserByEmail(data.email);
            if (!user) {
                toast.error("No account found with this email address.");
                router.push("/forgot-password/error?emailNotFound=true");
                return;
            }
            await authClient.requestPasswordReset(
                {
                    email: data.email,
                    redirectTo: "/reset-password",
                },
                {
                    onSuccess: async () => {
                        toast.success("Check your email", {
                            description: "We have sent you a link to reset your password.",
                        });
                        router.push("/forgot-password/success");
                    },
                    onError: (error) => {
                        const errorMessage = getErrorMessage(error.error.code, "fr");
                        if (!errorMessage) {
                            toast.error("Something went wrong.");
                            return;
                        }
                        toast.error(errorMessage!.title, {
                            description: errorMessage!.description,
                        });
                    },
                }
            );
        });
    };
    return (
        <Form {...form}>
            <form className={cn("flex flex-col gap-6", className)} onSubmit={form.handleSubmit(onSubmit)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Forgot your password?</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email below to reset your password.
                    </p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} id="email" type="email" placeholder="m@example.com" required />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={isPending || form.formState.isSubmitting} type="submit" className="w-full">
                        Reset password
                    </Button>
                </div>
            </form>
        </Form>
    )
}

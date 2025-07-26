import { deleteSession } from "@/lib/auth";
import { FormState, SignupFormSchema } from "@/types/auth";
import { redirect } from "next/navigation";

export class AuthService {
    static async signup(state: FormState, formData: FormData) {
        // Validate form fields
        const validatedFields = SignupFormSchema.safeParse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        });

        // If any form fields are invalid, return early
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        // Call the provider or db to create a user...
    }

    static async logout() {
        await deleteSession();
        redirect('/login');
    }
}
"use server";
import { SignupFormSchema, FormState } from '@/types/auth';
import { deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';


export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Call the provider or db to create a user...
}

export async function logout() {
    await deleteSession()
    redirect('/login')
}

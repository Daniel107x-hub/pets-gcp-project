import { FormState, LoginFormSchema } from "@/app/lib/definitions";
import axiosInstance from "@/app/config/axiosConfig";
import { redirect } from "next/navigation";

export async function login(state: FormState, formData: FormData){
    const validateFields = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    });
    if(!validateFields.success){
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }
    // Execute api call
    const { email, password } = validateFields.data;
    try{
        const response = await axiosInstance.post('/login', {
            email,
            password
        });
    }catch(e: any){
        return {
            message: "Something went wrong"
        }
    }
    redirect("/home");
}

export async function signIn(state: FormState, formData: FormData){
    const validateFields = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    });
    if(!validateFields.success){
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }
    // Execute api call
    const { email, password } = validateFields.data;
    try{
        const response = await axiosInstance.post('/register', {
            email,
            password
        });
    }catch(e: any){
        return {
            message: "Something went wrong"
        }
    }
    redirect("/");
}
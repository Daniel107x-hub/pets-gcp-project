import { LoginFormState, LoginFormSchema, SignupFormState, SignupFormSchema } from "@/app/lib/definitions";
import axiosInstance from "@/app/config/axiosConfig";
import { redirect } from "next/navigation";
import { User } from "../_types/User";

export async function login(state: LoginFormState, formData: FormData){
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
        await axiosInstance.post('/login', {
            email,
            password
        }, {
            params: {
                useCookies: true
            }
        });
    }catch(e: any){
        return {
            message: "Something went wrong"
        }
    }
    redirect("/home");
}

export async function signIn(state: SignupFormState, formData: FormData){
    const validateFields = SignupFormSchema.safeParse({
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
        await axiosInstance.post('/register', {
            email,
            password
        });
    }catch(err){
        return {
            message: "Something went wrong"
        }
    }
    redirect("/");
}

export async function logout(){
    try{
        await axiosInstance.post('/logout', {});
    }catch(err){
        return {
            message: "Something went wrong"
        }
    }
    redirect("/");
}

export async function getCurrentUser(){
    try{
        const response = await axiosInstance.get<User>('/me');
        return response.data;
    }catch(err){}
    redirect("/");
};
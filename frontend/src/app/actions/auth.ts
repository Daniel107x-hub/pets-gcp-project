import { FormState, LoginFormSchema } from "@/app/lib/definitions";
import axios from "axios";

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
    const response = await axios.post('/login', {
        email,
        password
    });
    console.log(response);
}
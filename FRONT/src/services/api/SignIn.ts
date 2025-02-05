import { useApi } from "../hooks/useAPI";
import { SignInData } from "../interfaces/SingIn";


const api = useApi()

export async function SignIn(userCredentials: SignInData) {
    const { data } = await api.post('auth/signin', userCredentials)
    console.log(data)

    return data
}
import useApi from '../hooks/useAPI';
import { RegisterData } from '../interfaces/Register';

const api = useApi()

interface RegisterRequest {
    email: string,
    password: string
}

export async function register(registerForm: RegisterData):Promise<boolean | undefined> {
    const userCredentials: RegisterRequest = {
        email: registerForm.email,
        password: registerForm.password
    }
    
    
    const response = await api.post('auth/register', userCredentials)

    if (response.status === 201 && response.data.user) {
        return true
    
    } else {
        console.error('User creation failed')
    }
}
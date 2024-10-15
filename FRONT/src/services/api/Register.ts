import { user } from "../fakers/userFaker";
import { SignUpData } from "../interfaces/SignUp";

export async function Register(newUser: SignUpData) {
    const userList = user
    const newUserId = userList.length + 1
    
    const newUserData = {
        id: newUserId,
        email: newUser.email,
        password: newUser.password
    }
    
    userList.push(newUserData)

    return newUserData;
}
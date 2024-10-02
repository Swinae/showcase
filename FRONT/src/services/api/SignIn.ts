import { user } from "../fakers/userFaker";
/* import useApi from "../hooks/useAPI"; */
import { SignInData } from "../interfaces/SingIn";

export async function SignIn(userSigninData: SignInData) {
    const userInfo = user.find((user) => user.email === userSigninData.email && user.password === userSigninData.password)
    return userInfo ? 'Incorrect email or password' : userInfo
}
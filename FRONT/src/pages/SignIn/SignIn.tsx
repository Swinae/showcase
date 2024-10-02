import './SignIn.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SignIn } from '../../services/api/SignIn';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function SignInPage() {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const signInSchema = yup.object({
        email: yup.string()
            .email('Invalid email address')
            .required('Email is required'),

        password: yup.string()
            .min(12, 'Password must be at least 12 characters')
            .required('Password is required'),
    })

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInSchema,
        onSubmit: async values => {
            try {
                const userExist = await SignIn(values)
                if (userExist !== undefined) {
                    console.log('user exist');
                    navigate("/mytrips")

                } else {
                    console.log("can't find user");

                }
            } catch (error) {
                console.error(error)
            }

        }
    })

    return (
        <>
            <h2>Sign in to Trippr</h2>


            <form action="" onSubmit={handleSubmit}>
                <div className="input">
                    <label htmlFor="email-input">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email-input"
                        onChange={handleChange}
                        value={values.email} />
                </div>
                {errors.email && <small className="error">{errors.email}</small>}

                <div className="input">
                    <label htmlFor="password-input">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password-input"
                        onChange={handleChange}
                        value={values.password} />
                    <i
                        id='toggle-password-icon'
                        className={showPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                        onClick={togglePasswordVisibility}>
                    </i>
                </div>
                {errors.password && <small className="error">{errors.password}</small>}

                <button type="submit">Sign in</button>
            </form>

            <p>Don't have an account ? <NavLink to={"/register"} className={"link"}>Register now !</NavLink></p>
        </>
    )
}
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SignIn } from '../../services/api/SignIn';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { css } from '@emotion/react';
import { ButtonType2 } from '../../components/Buttons/ButtonType2';

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

    // --- STYLE --- //
    const title = css`
        text-align: center;
    `
    
    const formStyle = css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;

        input {
            padding: 1rem 1rem;
            font-family: 'Open Sans', sans-serif;
            border: none;
            border-radius: 2rem;
            background-color: rgba(199, 199, 199, 0.164);
        }

        #toggle-password-icon {
            position: absolute;
            right: 5%;
            top: 50%;
            transform: translateY(-50%); 
            cursor: pointer;
            color: rgba(150, 150, 150, 0.747);
        }

        .input-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            position: relative;
        }

        .error {
            color: red;
        }

        .link {
            color: var(--third-font-color);
        }
    `

    return (
        <>
            <h2 css={title}>Sign in to Trippr</h2>

            <form onSubmit={handleSubmit} css={formStyle}>
                <div className="input-container">
                    <input
                        placeholder='Email'
                        type="email"
                        name="email"
                        id="email-input"
                        onChange={handleChange}
                        value={values.email} />
                </div>
                {errors.email && <small className="error">{errors.email}</small>}

                <div className="input-container">
                    <input
                        placeholder='Password'
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

                <ButtonType2 ButtonText='Sign in' />
            </form>

            <small>Don't have an account ? <NavLink to={"/register"} className={"link-orange"}>Register now !</NavLink></small>
        </>
    )
}
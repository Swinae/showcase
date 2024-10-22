import { useFormik } from 'formik';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Register } from '../../services/api/Register';
import { css } from '@emotion/react';

export function RegisterPage() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const registerSchema = yup.object({
        email: yup.string()
            .email('Invalid email address')
            .required('Email is required'),

        password: yup.string()
            .min(12, 'Password must be at least 12 characters')
            .required('Password is required'),

        confirm: yup.string().oneOf([yup.ref('password')], 'Password and confirmation do not match').required('Please confirm your password')
    })

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm: ''
        },

        validationSchema: registerSchema,
        onSubmit: async values => {
            try {
                const userIsCreated = await Register(values)   
                if (userIsCreated !== undefined) {
                    navigate('/signin')
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
            <h2 css={title}>Create a new Trippr account</h2>

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

                <div className="input-container">
                    <input
                        placeholder='Confirm password'
                        type={showPassword ? 'text' : 'password'}
                        name="confirm"
                        id="confirm-input"
                        onChange={handleChange}
                        value={values.confirm} />
                    <i
                        id='toggle-password-icon'
                        className={showPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                        onClick={togglePasswordVisibility}>
                    </i>
                </div>
                {errors.confirm && <small className="error">{errors.confirm}</small>}

                <button type="submit">Register</button>
            </form>

            <p>Already have an account ? <NavLink to={"/signin"} className={"link"}>Sign in</NavLink></p>
        </>
    )
}
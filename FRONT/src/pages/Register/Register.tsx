import { useFormik } from 'formik';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Register } from '../../services/api/Register';

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

    return (
        <>
            <h2>Create a new Trippr account</h2>

            <form onSubmit={handleSubmit}>
                <div className="input">
                    <input
                        placeholder='Email'
                        type="email"
                        name="email"
                        id="email-input"
                        onChange={handleChange}
                        value={values.email} />
                </div>
                {errors.email && <small className="error">{errors.email}</small>}

                <div className="input">
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

                <div className="input">
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
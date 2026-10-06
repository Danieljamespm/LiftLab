import React from 'react'
import { useState } from 'react'
import Wordmark from "../assets/Wordmark.png"
import { useNavigate } from 'react-router'

const Register = ({ setUser }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [success, setSuccess] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (password != confirmPassword) {
            setError("Passwords do not match")
            return
        }

        const response = await fetch("http://localhost:5000/api/users/register", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.message)
            return
        }

        setUser(data)
        localStorage.setItem("user", JSON.stringify(data))

        setSuccess("Account created! Welcome to LiftLab")

        setTimeout(() => {
            navigate("/")
        }, 2000)


    }

    return (
        <div className='register-page'>
            <div className='register-container'>
                <img
                    className='register-wordmark'
                    src={Wordmark}
                    alt="LiftLab" />
                <h1 className='register-title'>Create An Account</h1>

                <form onSubmit={handleSubmit}
                    className='register-form'>

                    <div className="register-field">
                        <label htmlFor="name">First Name</label>
                        <input
                            className="register-input"
                            id="name"
                            type="text"
                            value={name}
                            placeholder="First Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='register-field'>
                        <label htmlFor="email">Email</label>
                        <input
                            className='register-input'
                            id='email'
                            type="text"
                            value={email}
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='register-field'>
                        <label htmlFor="password">Password</label>
                        <input
                            className='register-input'
                            id='password'
                            type="password"
                            value={password}
                            placeholder='Create Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='register-field'>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            className='register-input'
                            id='confirm-password'
                            type="password"
                            value={confirmPassword}
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPassword && (
                            <p className={password === confirmPassword ? "password-match" : "password-no-match"}>
                                {password === confirmPassword ? "✓ Passwords match" : "✕ Passwords do not match"}
                            </p>
                        )}
                    </div>
                    {error && (
                        <p className="register-error">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className='register-success'>  ✓ {success}</p>
                    )}
                    <button type='submit' className='register-btn' disabled={success}>{success ? "Account Created ✓" : "Sign Up"} </button>
                </form>
            </div>


        </div>
    )
}

export default Register
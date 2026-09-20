import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Wordmark from "../assets/Wordmark.png"

const Login = ({ setUser }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
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

        navigate("/")

        console.log(data)

    }

    return (
        <div className='login-page'>
            <div className='login-container'>
                <img
                    className='login-wordmark'
                    src={Wordmark}
                    alt="LiftLab" />
                <h1 className='login-title'>Welcome Back</h1>
                <p className='login-subtitle'>Sign in to keep moving</p>
                <form onSubmit={handleSubmit}
                    className='login-form'
                >
                    <div className='login-field'>
                        <label htmlFor="email">Email</label>
                        <input
                            className='login-input'
                            id='email'
                            type="text"
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='login-field'>
                        <label htmlFor="password">Password</label>
                        <input
                            className='login-input'
                            id='password'
                            type="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='login-btn'>Login</button>
                </form>

                {error && <p>{error}</p>}



            </div>
        </div>
    )
}

export default Login

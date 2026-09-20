import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {

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

        localStorage.setItem("user", JSON.stringify(data))

        navigate("/")

        console.log(data)

    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Login</button>
            </form>

            {error && <p>{error}</p>}




        </>
    )
}

export default Login

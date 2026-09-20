import React from 'react'
import { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()


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
            console.log(data.message)
            return

        }

        localStorage.setItem("user", JSON.stringify(data))

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




        </>
    )
}

export default Login

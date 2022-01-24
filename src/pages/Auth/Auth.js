import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "./Auth.scss"
const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    const API_KEY = process.env.REACT_APP_API_KEY

    const authIn = async (e) => {
        e.preventDefault()
        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            API_KEY
        const credits = {
            email,
            password,
            returnSecureToken: true,
            type: "login",
        }
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(credits),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.registered) {
                    sessionStorage.setItem("refreshToken", data.refreshToken)
                    history.push("/")
                }
            })
    }

    return (
        <div className="auth">
            <div className="container">
                <form onSubmit={(e) => authIn(e)}>
                    <div>
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="current-email"
                            placeholder="Type your email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"></label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="Type your password"
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Auth

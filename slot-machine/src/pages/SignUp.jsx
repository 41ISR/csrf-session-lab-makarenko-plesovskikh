
import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"

const SignUp = () => {
    const navigate = useNavigate()
    const [error, setError] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(undefined)
        
        if (e.target.password.value !== e.target.password2.value){
            setError("Пароли не совпадают")
            return
        }
        
        const user = {
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value,
        }

        try {
            const res = await fetch("https://potential-cod-97rq6j9575v3955p-3000.app.github.dev/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data)

            console.log(res)
            navigate("/")
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }
    return (
        <div id="auth-screen" className="screen active">
            <div className="auth-container">
                <h1 className="casino-title">🎲 Однорукий друг</h1>
                <div className="auth-tabs">
                    <Link to={"/login"} className="tab-btn">
                        Вход
                    </Link>
                    <Link to={"/signup"} className="tab-btn active">
                        Регистрация
                    </Link>
                </div>
                <form onSubmit={handleSubmit} id="signup-form" className="auth-form">
                    <div className="form-group">
                        <label>Имя пользователя</label>
                        <input
                            type="text"
                            placeholder="Придумайте имя"
                            name="username"
                            required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Введите email"
                            name="email"
                            required />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="Придумайте пароль"
                            name="password"
                            required />
                    </div>
                    <div className="form-group">
                        <label>Подтвердите пароль</label>
                        <input
                            type="password"
                            placeholder="Повторите пароль"
                            name="password2"
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Создать аккаунт
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp

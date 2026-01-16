import { useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const { clearUser } = useAuthStore()
    const navigate = useNavigate()
    useEffect(() => {
        const logUserOut = async () => {
            await fetch("https://potential-cod-97rq6j9575v3955p-3000.app.github.dev/auth/logout", {
                credentials: "include"
            })
            clearUser()
            navigate("/login")
        }
        logUserOut()
    }, [])

    return <></>
}

export default Logout
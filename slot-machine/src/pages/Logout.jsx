import { useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const { clearUser } = useAuthStore()
    const navigate = useNavigate()
    useEffect(() => {
        const logUserOut = async () => {
            await fetch("https://studious-doodle-97jv5r7qpqx5f7r6w-3000.app.github.dev/auth/logout", {
                method: "POST",
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
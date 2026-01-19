import { useState, useEffect } from "react"
import SlotMachine from "../components/SlotMachine"
import PayoutTable from "../components/PayoutTable"
import Header from "../components/Header"
import { useAuthStore } from "../store/useAuthStore"
import Button from "../components/Button"

const Game = () => {
    const { user, csrfToken, getCsrfToken, checkAuth } = useAuthStore()
    const [currentBet, setCurrentBet] = useState(10)
    const [symbols, setSymbols] = useState(['📚','✏️','🧠'])
    const [isSpinning, setIsSpinning] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => { getCsrfToken() }, [])

    const spin = async () => {
        setIsSpinning(true)
        setMessage("")

        const res = await fetch("https://studious-doodle-97jv5r7qpqx5f7r6w-3000.app.github.dev/api/spin", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify({ bet: currentBet })
        })

        const data = await res.json()

        setTimeout(() => {
            setSymbols(data.symbols)
            setMessage(data.isWin ? `🎉 Вы выиграли ${data.winAmount} е-баллов!` : "😢 Не повезло")
            setIsSpinning(false)
            checkAuth()
        }, 1500)
    }

    return (
        <div className="game-container">
            <Header balance={user.user.escore} />

            <div className="slot-machine">
                <div className="slot-machine-header">
                    <h2>🎲 Однорукий друг 🎲</h2>
                </div>

                <SlotMachine symbols={symbols} isSpinning={isSpinning} />
                <div className="win-message">{message}</div>

                <div className="bet-section">
                    <h3>Выберите ставку</h3>
                    <div className="bet-buttons">
                        {[10,50,100].map(b => (
                            <Button key={b} className={`bet-btn ${currentBet===b?"active":""}`} onClick={() => setCurrentBet(b)} disabled={isSpinning}>
                                <span className="bet-amount">{b}</span>
                                <span className="bet-label">е-баллов</span>
                            </Button>
                        ))}
                    </div>
                </div>

                <Button className="spin-btn" onClick={spin} disabled={isSpinning || user.user.escore < currentBet}>
                    <span className="spin-text">КРУТИТЬ</span>
                    <span className="spin-cost">Стоимость: {currentBet} е-баллов</span>
                </Button>
            </div>

            <PayoutTable />
        </div>
    )
}

export default Game

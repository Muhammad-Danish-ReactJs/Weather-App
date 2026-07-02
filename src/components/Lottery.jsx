import { useState } from "react";
import { getTicket, sum } from "../utils/helper";
import Ticket from "./Ticket";
import "../styles/Lottery.css";

export default function Lottery({ n = 3, winningSum = 15 }) {
  const [ticket, setTicket] = useState(() => getTicket(n));
  const [tries, setTries] = useState(1);
  const [wins, setWins] = useState(0);

  const isWinning = sum(ticket) === winningSum;

  const buyTicket = () => {
    const newTicket = getTicket(n);
    setTicket(newTicket);
    setTries((t) => t + 1);
    if (sum(newTicket) === winningSum) setWins((w) => w + 1);
  };

  return (
    <div className="lottery-wrapper">
      {isWinning && (
        <div className="confetti-row">
          {["🎉", "🏆", "⭐", "🎊", "💰", "🎉"].map((e, i) => (
            <span key={i} className="confetti-emoji" style={{ animationDelay: `${i * 0.1}s` }}>{e}</span>
          ))}
        </div>
      )}

      <div className="lottery-header">
        <div className="lottery-badge">🎰 LOTTERY</div>
        <h1 className="lottery-title">Lucky Draw</h1>
        <p className="lottery-subtitle">Match the sum of <strong>{winningSum}</strong> to win!</p>
      </div>

      <Ticket ticket={ticket} isWinning={isWinning} />

      <div className={`lottery-result ${isWinning ? "result-win" : "result-lose"}`}>
        {isWinning ? "🏆 Jackpot! You Won!" : "😔 Not this time — try again!"}
      </div>

      <button className="lottery-btn" onClick={buyTicket}>
        🎟️ Buy New Ticket
      </button>

      <div className="lottery-stats">
        <div className="stat">
          <span className="stat-value">{tries}</span>
          <span className="stat-label">Tries</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">{wins}</span>
          <span className="stat-label">Wins</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">{tries > 0 ? ((wins / tries) * 100).toFixed(1) : 0}%</span>
          <span className="stat-label">Win Rate</span>
        </div>
      </div>
    </div>
  );
}

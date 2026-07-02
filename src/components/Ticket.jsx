import TicketNum from "./TicketNum";
import "../styles/Ticket.css";

export default function Ticket({ ticket, isWinning }) {
  return (
    <div className={`ticket ${isWinning ? "ticket-win" : ""}`}>
      <div className="ticket-label">YOUR TICKET</div>
      <div className="ticket-numbers">
        {ticket.map((num, i) => (
          <TicketNum key={i} num={num} isWinning={isWinning} />
        ))}
      </div>
      <div className="ticket-sum">
        Sum: <strong>{ticket.reduce((a, b) => a + b, 0)}</strong>
      </div>
    </div>
  );
}

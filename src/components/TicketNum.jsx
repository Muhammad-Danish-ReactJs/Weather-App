import { useEffect, useState } from "react";
import "../styles/TicketNum.css";

export default function TicketNum({ num, isWinning }) {
  const [display, setDisplay] = useState("?");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setSpinning(true);
    setDisplay("?");
    let count = 0;
    const interval = setInterval(() => {
      setDisplay(Math.floor(Math.random() * 10));
      count++;
      if (count > 8) {
        clearInterval(interval);
        setDisplay(num);
        setSpinning(false);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [num]);

  return (
    <div className={`ticket-num ${spinning ? "spinning" : ""} ${isWinning ? "winning" : ""}`}>
      {display}
    </div>
  );
}

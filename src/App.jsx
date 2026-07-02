import "./styles/global.css";
import Lottery from "./components/Lottery";

function App() {
  return <Lottery n={3} winningSum={15} />;
}

export default App;

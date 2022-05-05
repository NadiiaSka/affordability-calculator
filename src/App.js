import ButtonRow from "./components/ButtonRow";
import InputRow from "./components/InputRow";

function App() {
  return (
    <div className="Container">
      <h1>Calculator</h1>
      <p>How many of you are buying the property?</p>
      <ButtonRow />
      <p>What is your base salary/wages? (before tax)</p>
      <InputRow />
    </div>
  );
}

export default App;

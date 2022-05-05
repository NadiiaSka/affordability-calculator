const InputRow = ({ labelText, name }) => {
  return (
    <div className="inputRow">
      <p>{labelText}</p>
      <span>$ </span>
      <input type="number" name={name} className="input" />
      <select className="dropDown">
        <option value="perYear">per year</option>
        <option value="perWeek">per week</option>
      </select>
    </div>
  );
};

export default InputRow;

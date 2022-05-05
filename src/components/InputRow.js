const InputRow = () => {
  return (
    <div className="inputRow">
      <span>$ </span>
      <input type="number" name="salary" className="input" />
      <select className="dropDown">
        <option value="perYear">per year</option>
        <option value="perWeek">per week</option>
      </select>
    </div>
  );
};

export default InputRow;

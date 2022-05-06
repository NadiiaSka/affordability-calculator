const InputRow = ({ labelText, name, values, setValues, calculateTotal }) => {
  const changeValueHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    calculateTotal(newValues);
  };

  return (
    <div className="inputRow">
      <p>{labelText}</p>
      <span>$ </span>
      <input
        type="number"
        name={name}
        className="input"
        onChange={changeValueHandler}
      />
      <select className="dropDown">
        <option value="perYear">per year</option>
        <option value="perWeek">per week</option>
      </select>
    </div>
  );
};

export default InputRow;

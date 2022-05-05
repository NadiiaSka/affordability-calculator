const InputRow = () => {
  return (
    <>
      <span>$ </span>
      <input type="number" name="salary" className="input" />
      <select className="dropDown">
        <option value="perYear">per year</option>
        <option value="perWeek">per week</option>
      </select>
    </>
  );
};

export default InputRow;

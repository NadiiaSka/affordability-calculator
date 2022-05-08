const DropDown = ({ handleOptionChange }) => {
  return (
    <>
      <select className="dropDown" onChange={handleOptionChange}>
        <option value="perYear">per year </option>
        <option value="perWeek">per week</option>
      </select>
    </>
  );
};

export default DropDown;

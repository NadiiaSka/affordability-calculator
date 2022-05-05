const Button = ({ label, className, handleButtonSelected }) => {
  return (
    <button className={`btn ${className}`} onClick={handleButtonSelected}>
      {label}
    </button>
  );
};

export default Button;

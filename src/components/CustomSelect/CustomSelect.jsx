import  { useState, useRef, useEffect } from "react";
import "./CustomSelect.scss";
import PropTypes from "prop-types";

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Toggle dropdown open/close
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Select an option and close the dropdown
  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={ref}>
      <button className="custom-select-trigger" onClick={toggleDropdown}>
        {value}
      </button>
      {isOpen && (
        <ul className="custom-options">
          {options.map((option) => (
            <li
              key={option}
              className={`custom-option ${value === option ? "selected" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;

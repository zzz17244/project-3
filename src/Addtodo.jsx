import React, { useState } from 'react';
import './Addtodo.css'; // Import the CSS file

const Addtodo = ({ handleAddTodos }) => {
  const [inputs, setInputs] = useState({
    Status: "REVISE",
    Flight: "",
    Return_Flight: "",
    EFF_Date: "",
    End_Date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { Status, Flight, Return_Flight, EFF_Date, End_Date } = inputs;
    if (!Status || !Flight || !Return_Flight || !EFF_Date || !End_Date) {
      return;
    }
    handleAddTodos(inputs);
    setInputs({
      Status: "REVISE",
      Flight: "",
      Return_Flight: "",
      EFF_Date: "",
      End_Date: ""
    });
  };

  const inputConfig = [
    { name: 'Flight', placeholder: 'Flight', type: 'text' },
    { name: 'Return_Flight', placeholder: 'Return Flight', type: 'number' },
    { name: 'EFF_Date', placeholder: 'EFF Date', type: 'date' },
    { name: 'End_Date', placeholder: 'End Date', type: 'date' }
  ];

  return (
    <form className="add-todo-container" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="Status">Status</label>
        <select
          name="Status"
          id="Status"
          value={inputs.Status}
          onChange={handleChange}
          className="add-todo-input"
        >
          <option value="REVISE">REVISE</option>
          <option value="ORIGINAL">ORIGINAL</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
      {inputConfig.map((input) => (
        <div key={input.name} className="input-group">
          <label htmlFor={input.name}>{input.placeholder}</label>
          <input
            type={input.type}
            name={input.name}
            id={input.name}
            placeholder={input.placeholder}
            value={inputs[input.name]}
            onChange={handleChange}
            className="add-todo-input"
          />
        </div>
      ))}
      <button type="submit" className="add-todo-button">Add</button>
    </form>
  );
};

export default Addtodo;

import React, { useState } from 'react';

const Addtodo = ({ handleAddTodos }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    handleAddTodos(input);
    setInput("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add todo"
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '70%', padding: '10px', boxSizing: 'border-box' }}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default Addtodo;

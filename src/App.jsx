import React, { useState } from 'react';
import Addtodo from './Addtodo';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodoName, setEditedTodoName] = useState("");

  const handleAddTodo = (todo) => {
    if (!todo) {
      return;
    }
    
    const newTodo = {
      name: todo,
      id: todos.length + 1
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id, name) => {
    setEditTodoId(id);
    setEditedTodoName(name);
  };

  const handleSaveEditTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, name: editedTodoName };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditedTodoName("");
  };

  return (
    <div>
      <nav style={{ background: '#FFF118', padding: '10px 20px' }}>
        <div style={{ color: 'black', marginBottom: '10px', fontSize: '25px', fontWeight: 'bold' }}>
          Irregularity Flight Handling 
        </div>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'space-around' }}>
          <li>View Revise List</li>
          <li>View 72 Hours Final</li>
          <li>View All Final Flight </li>
          <li>View Action List</li>
          <li>View Call Out List</li>
          <li>View & Manage PNR</li>
          <li>Update Text |Chat Bot| Voice| Call </li>
        </ul>
      </nav>
      <h3>My Flight Lists</h3>
      
      <Addtodo handleAddTodos={handleAddTodo} />
      <div style={{ border: '2px solid #007BFF', margin: '10px 0' }}> {/* Change the border color here */}
        {todos.map(todo => (
          <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #007BFF', padding: '10px', backgroundColor: '#F0F0F0' }}> {/* Changed border color and added background color */}
            <button onClick={() => handleDeleteTodo(todo.id)} style={{ backgroundColor: 'orange', border: 'none', borderRadius: '4px', padding: '5px', marginRight: '10px' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/4778/4778354.png" alt="Recycle Bin" width="15" height="15" style={{ filter: 'brightness(0) invert(1)' }} />
            </button>
            <button onClick={() => handleEditTodo(todo.id, todo.name)} style={{ backgroundColor: 'blue', border: 'none', padding: '0', marginRight: '10px' }}>
              <img src="https://w7.pngwing.com/pngs/766/581/png-transparent-computer-icons-editing-others.png" alt="Edit" width="20" height="20" />
            </button>
            {editTodoId === todo.id ? (
              <div style={{ flexGrow: 1 }}>
                <input
                  type="text"
                  value={editedTodoName}
                  onChange={(e) => setEditedTodoName(e.target.value)}
                  style={{ flexGrow: 1, marginRight: '10px' }}
                />
                <button onClick={() => handleSaveEditTodo(todo.id)}>Save</button>
              </div>
            ) : (
              <span style={{ flexGrow: 1 }}>{todo.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

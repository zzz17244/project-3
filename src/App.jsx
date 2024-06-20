import React, { useState } from 'react';
import Addtodo from './Addtodo';
import './App.css'; // Import the CSS file

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodo, setEditedTodo] = useState({ Status: "REVISE", Flight: "", Return_Flight: "", EFF_Date: "", End_Date: "" });
  const [activeTab, setActiveTab] = useState('View Revise List');

  const handleAddTodo = (todo) => {
    if (!todo.Status || !todo.Flight || !todo.Return_Flight || !todo.EFF_Date || !todo.End_Date) {
      return;
    }

    const newTodo = {
      ...todo,
      id: todos.length + 1
    };

    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id, todo) => {
    setEditTodoId(id);
    setEditedTodo(todo);
  };

  const handleSaveEditTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, ...editedTodo };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditedTodo({ Status: "REVISE", Flight: "", Return_Flight: "", EFF_Date: "", End_Date: "" });
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short' };
    return new Date(date).toLocaleDateString('en-US', options).replace(/ /g, '-');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'View Revise List':
        return <div className="tab-content-text">View Revise List</div>;
      case 'View 72 Hours Final':
        return <div className="tab-content-text">View 72 Hours Final</div>;
      case 'View All Final Flight':
        return <div className="tab-content-text">View All Final Flight</div>;
      case 'View Action List':
        return <div className="tab-content-text">View Action List</div>;
      case 'View Call Out List':
        return <div className="tab-content-text">View Call Out List</div>;
      case 'View & Manage PNR':
        return <div className="tab-content-text">View & Manage PNR</div>;
      case 'Update Text |Chat Bot| Voice| Call':
        return <div className="tab-content-text">Update Text |Chat Bot| Voice| Call</div>;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-title">ASM Irregularity Flight Handling</div>
        <ul className="navbar-menu">
          <li className={`nav-item ${activeTab === 'View Revise List' ? 'active' : ''}`} onClick={() => setActiveTab('View Revise List')}>View Revise List</li>
          <li className={`nav-item ${activeTab === 'View 72 Hours Final' ? 'active' : ''}`} onClick={() => setActiveTab('View 72 Hours Final')}>View 72 Hours Final</li>
          <li className={`nav-item ${activeTab === 'View All Final Flight' ? 'active' : ''}`} onClick={() => setActiveTab('View All Final Flight')}>View All Final Flight</li>
          <li className={`nav-item ${activeTab === 'View Action List' ? 'active' : ''}`} onClick={() => setActiveTab('View Action List')}>View Action List</li>
          <li className={`nav-item ${activeTab === 'View Call Out List' ? 'active' : ''}`} onClick={() => setActiveTab('View Call Out List')}>View Call Out List</li>
          <li className={`nav-item ${activeTab === 'View & Manage PNR' ? 'active' : ''}`} onClick={() => setActiveTab('View & Manage PNR')}>View & Manage PNR</li>
          <li className={`nav-item ${activeTab === 'Update Text |Chat Bot| Voice| Call' ? 'active' : ''}`} onClick={() => setActiveTab('Update Text |Chat Bot| Voice| Call')}>Update Text |Chat Bot| Voice| Call</li>
        </ul>
      </nav>
      <div className="tab-content">
        {renderTabContent()}
      </div>
      <Addtodo handleAddTodos={handleAddTodo} />
      <div className="todos-container">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <div className="todo-details">
              <div className="todo-detail"><strong>Status:</strong> {todo.Status}</div>
              <div className="todo-detail"><strong>Flight:</strong> {todo.Flight}</div>
              <div className="todo-detail"><strong>Return Flight:</strong> {todo.Return_Flight}</div>
              <div className="todo-detail"><strong>EFF Date:</strong> {formatDate(todo.EFF_Date)}</div>
              <div className="todo-detail"><strong>End Date:</strong> {formatDate(todo.End_Date)}</div>
            </div>
            <div className="button-container">
              <button onClick={() => handleEditTodo(todo.id, todo)} className="edit-button">
                <img src="https://w7.pngwing.com/pngs/766/581/png-transparent-computer-icons-editing-others.png" alt="Edit" className="icon" />
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">
                <img src="https://cdn-icons-png.flaticon.com/512/4778/4778354.png" alt="Recycle Bin" className="icon" />
              </button>
            </div>
            {editTodoId === todo.id && (
              <div className="edit-input-container">
                <select
                  name="Status"
                  value={editedTodo.Status}
                  onChange={(e) => setEditedTodo({ ...editedTodo, Status: e.target.value })}
                  className="edit-input"
                >
                  <option value="REVISE">REVISE</option>
                  <option value="ORIGINAL">ORIGINAL</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
                <input
                  type="text"
                  value={editedTodo.Flight}
                  onChange={(e) => setEditedTodo({ ...editedTodo, Flight: e.target.value })}
                  className="edit-input"
                />
                <input
                  type="number"
                  value={editedTodo.Return_Flight}
                  onChange={(e) => setEditedTodo({ ...editedTodo, Return_Flight: e.target.value })}
                  className="edit-input"
                />
                <input
                  type="date"
                  value={editedTodo.EFF_Date}
                  onChange={(e) => setEditedTodo({ ...editedTodo, EFF_Date: e.target.value })}
                  className="edit-input"
                />
                <input
                  type="date"
                  value={editedTodo.End_Date}
                  onChange={(e) => setEditedTodo({ ...editedTodo, End_Date: e.target.value })}
                  className="edit-input"
                />
                <button onClick={() => handleSaveEditTodo(todo.id)} className="save-button">Save</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import Addtodo from './Addtodo';
import './App.css'; // Import the CSS file

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodo, setEditedTodo] = useState({ Status: "REVISE", Departure_Flight: "", Return_Flight: "", EFF_Date: "", End_Date: "", Frequency: [], Except: [], Messenger: {} });
  const [activeTab, setActiveTab] = useState('View Revise List');

  const handleAddTodo = (todo) => {
    if (!todo.Status || !todo.Departure_Flight || !todo.Return_Flight || !todo.EFF_Date || !todo.End_Date) {
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
    setEditedTodo({ Status: "REVISE", Departure_Flight: "", Return_Flight: "", EFF_Date: "", End_Date: "", Frequency: [], Except: [], Messenger: {} });
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short' };
    return new Date(date).toLocaleDateString('en-GB', options).replace(/ /g, ' ');
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

  const renderMessengerLabels = (messenger) => {
    const labels = [];
    if (messenger.smsThai) labels.push("SMS Thai");
    if (messenger.smsEnglish) labels.push("SMS English");
    if (messenger.smsLocal) labels.push("SMS Local");
    if (messenger.emailThai) labels.push("Email Thai");
    if (messenger.emailEnglish) labels.push("Email English");
    if (messenger.emailLocal) labels.push("Email Local");
    if (messenger.textVoiceThai) labels.push("Text Voice Thai");
    if (messenger.textVoiceEnglish) labels.push("Text Voice English");
    if (messenger.textVoiceLocal) labels.push("Text Voice Local");
    return labels.join(" / ");
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
      <h3>My Flight Lists</h3>
      <Addtodo handleAddTodos={handleAddTodo} />
      <div className="todos-container">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <div className="todo-details">
              <div>{todo.Status}</div>
              <div>DD: {todo.Departure_Flight}</div>
              <div>DD: {todo.Return_Flight}</div>
              <div>{formatDate(todo.EFF_Date)}</div>
              <div>{formatDate(todo.End_Date)}</div>
              <div>Freq: {todo.Frequency.join(' / ')}</div>
              <div>Except: {todo.Except.join(' / ')}</div>
              <div>{renderMessengerLabels(todo.Messenger)}</div>
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
                  value={editedTodo.Departure_Flight}
                  onChange={(e) => setEditedTodo({ ...editedTodo, Departure_Flight: e.target.value })}
                  className="edit-input"
                />
                <input
                  type="text"
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
                <div className="checkbox-group">
                  {['1', '2', '3', '4', '5', '6', '7'].map((value, index) => (
                    <div key={value} className="checkbox-item">
                      <label className="checkbox-label">{['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'][index]}</label>
                      <input
                        type="checkbox"
                        value={value}
                        checked={editedTodo.Frequency.includes(value)}
                        onChange={(e) => setEditedTodo({
                          ...editedTodo,
                          Frequency: e.target.checked
                            ? [...editedTodo.Frequency, value]
                            : editedTodo.Frequency.filter((day) => day !== value)
                        })}
                        className="edit-checkbox"
                      />
                    </div>
                  ))}
                </div>
                <div className="input-group">
                  <button type="button" className="except-button" onClick={() => setEditedTodo({ ...editedTodo, showPopup: !editedTodo.showPopup })}>EXCEPT</button>
                  {editedTodo.showPopup && (
                    <div className="popup">
                      <div className="popup-content">
                        <h3>Select Except Dates</h3>
                        <div className="popup-input-group">
                          {Array.from({ length: 30 }).map((_, index) => (
                            <div key={index} className="popup-input-item">
                              <label htmlFor={`except-${index}`} className="popup-input-label">{`Except${index + 1}`}</label>
                              <input
                                type="date"
                                id={`except-${index}`}
                                value={editedTodo.Except[index] || ''}
                                onChange={(e) => {
                                  const newExcept = [...editedTodo.Except];
                                  newExcept[index] = e.target.value;
                                  setEditedTodo({ ...editedTodo, Except: newExcept });
                                }}
                                className="popup-input"
                              />
                            </div>
                          ))}
                        </div>
                        <button type="button" className="close-popup-button" onClick={() => setEditedTodo({ ...editedTodo, showPopup: false })}>Close</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="input-group">
                  <button type="button" className="messenger-button" onClick={() => setEditedTodo({ ...editedTodo, showMessengerPopup: !editedTodo.showMessengerPopup })}>Messenger</button>
                  {editedTodo.showMessengerPopup && (
                    <div className="popup large-popup">
                      <div className="popup-content large-popup-content">
                        <h3>Messenger</h3>
                        <div className="popup-input-group large-popup-input-group">
                          {['smsThai', 'smsEnglish', 'smsLocal', 'emailThai', 'emailEnglish', 'emailLocal', 'textVoiceThai', 'textVoiceEnglish', 'textVoiceLocal'].map((key, index) => (
                            <div key={key} className="popup-input-item">
                              <label htmlFor={`messenger-${key}`} className="popup-input-label">{['SMS Thai', 'SMS English', 'SMS Local', 'Email Thai', 'Email English', 'Email Local', 'Text Voice Thai', 'Text Voice English', 'Text Voice Local'][index]}</label>
                              <textarea
                                id={`messenger-${key}`}
                                rows={15}
                                value={editedTodo.Messenger[key] || ''}
                                onChange={(e) => {
                                  const newMessenger = { ...editedTodo.Messenger, [key]: e.target.value };
                                  setEditedTodo({ ...editedTodo, Messenger: newMessenger });
                                }}
                                className="popup-textarea"
                              />
                            </div>
                          ))}
                        </div>
                        <button type="button" className="close-popup-button" onClick={() => setEditedTodo({ ...editedTodo, showMessengerPopup: false })}>Close</button>
                      </div>
                    </div>
                  )}
                </div>
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

import React, { useState } from 'react';
import './Addtodo.css'; // Import the CSS file

const Addtodo = ({ handleAddTodos }) => {
  const [inputs, setInputs] = useState({
    Status: "REVISE",
    Departure_Flight: "",
    Return_Flight: "",
    EFF_Date: "",
    End_Date: "",
    Frequency: [],
    Except: [],
    Messenger: {
      smsThai: "",
      smsEnglish: "",
      smsLocal: "",
      emailThai: "",
      emailEnglish: "",
      emailLocal: "",
      textVoiceThai: "",
      textVoiceEnglish: "",
      textVoiceLocal: ""
    }
  });
  const [showPopup, setShowPopup] = useState(false);
  const [showMessengerPopup, setShowMessengerPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split('.');
    if (subKey) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [mainKey]: {
          ...prevInputs[mainKey],
          [subKey]: value
        }
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      Frequency: checked
        ? [...prevInputs.Frequency, value]
        : prevInputs.Frequency.filter((day) => day !== value)
    }));
  };

  const handleExceptChange = (index, value) => {
    setInputs((prevInputs) => {
      const newExcept = [...prevInputs.Except];
      newExcept[index] = value;
      return {
        ...prevInputs,
        Except: newExcept
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { Status, Departure_Flight, Return_Flight, EFF_Date, End_Date, Frequency, Except, Messenger } = inputs;
    if (!Status || !Departure_Flight || !Return_Flight || !EFF_Date || !End_Date) {
      return;
    }
    handleAddTodos(inputs);
    setInputs({
      Status: "REVISE",
      Departure_Flight: "",
      Return_Flight: "",
      EFF_Date: "",
      End_Date: "",
      Frequency: [],
      Except: [],
      Messenger: {
        smsThai: "",
        smsEnglish: "",
        smsLocal: "",
        emailThai: "",
        emailEnglish: "",
        emailLocal: "",
        textVoiceThai: "",
        textVoiceEnglish: "",
        textVoiceLocal: ""
      }
    });
    setShowPopup(false);
    setShowMessengerPopup(false);
  };

  const inputConfig = [
    { name: 'Departure_Flight', placeholder: 'Departure Flight', type: 'text' },
    { name: 'Return_Flight', placeholder: 'Return Flight', type: 'text' },
    { name: 'EFF_Date', placeholder: 'EFF Date', type: 'date' },
    { name: 'End_Date', placeholder: 'End Date', type: 'date' }
  ];

  const daysOfWeek = [
    { label: 'SU', value: '1' },
    { label: 'MO', value: '2' },
    { label: 'TU', value: '3' },
    { label: 'WE', value: '4' },
    { label: 'TH', value: '5' },
    { label: 'FR', value: '6' },
    { label: 'SA', value: '7' }
  ];

  const messengerConfig = [
    { name: 'Messenger.smsThai', placeholder: 'SMS Thai' },
    { name: 'Messenger.smsEnglish', placeholder: 'SMS English' },
    { name: 'Messenger.smsLocal', placeholder: 'SMS Local' },
    { name: 'Messenger.emailThai', placeholder: 'Email Thai' },
    { name: 'Messenger.emailEnglish', placeholder: 'Email English' },
    { name: 'Messenger.emailLocal', placeholder: 'Email Local' },
    { name: 'Messenger.textVoiceThai', placeholder: 'Text Voice Thai' },
    { name: 'Messenger.textVoiceEnglish', placeholder: 'Text Voice English' },
    { name: 'Messenger.textVoiceLocal', placeholder: 'Text Voice Local' }
  ];

  return (
    <form className="add-todo-container" onSubmit={handleSubmit}>
      <div className="input-row">
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
        <div className="checkbox-group">
          {daysOfWeek.map((day) => (
            <div key={day.value} className="checkbox-item">
              <label htmlFor={`day-${day.value}`} className="checkbox-label">{day.label}</label>
              <input
                type="checkbox"
                id={`day-${day.value}`}
                value={day.value}
                checked={inputs.Frequency.includes(day.value)}
                onChange={handleCheckboxChange}
                className="add-todo-checkbox"
              />
            </div>
          ))}
        </div>
        <div className="input-group">
          <button type="button" className="except-button" onClick={() => setShowPopup(true)}>EXCEPT</button>
        </div>
        <div className="input-group">
          <button type="button" className="messenger-button" onClick={() => setShowMessengerPopup(true)}>Messenger</button>
        </div>
        <button type="submit" className="add-todo-button">Add</button>
      </div>
      {showPopup && (
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
                    value={inputs.Except[index] || ''}
                    onChange={(e) => handleExceptChange(index, e.target.value)}
                    className="popup-input"
                  />
                </div>
              ))}
            </div>
            <button type="button" className="close-popup-button" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
      {showMessengerPopup && (
        <div className="popup large-popup">
          <div className="popup-content large-popup-content">
            <h3>Messenger</h3>
            <div className="popup-input-group large-popup-input-group">
              {messengerConfig.map((input) => (
                <div key={input.name} className="popup-input-item">
                  <label htmlFor={input.name} className="popup-input-label">{input.placeholder}</label>
                  <textarea
                    name={input.name}
                    id={input.name}
                    placeholder={input.placeholder}
                    rows={15}
                    value={inputs[input.name.split('.')[0]][input.name.split('.')[1]]}
                    onChange={handleChange}
                    className="popup-textarea"
                  />
                </div>
              ))}
            </div>
            <button type="button" className="close-popup-button" onClick={() => setShowMessengerPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Addtodo;

import React, { useState } from 'react';
import './Addtodo.css'; // Import the CSS file

const Addtodo = ({ handleAddTodos }) => {
  const [inputs, setInputs] = useState({
    SSM_PLN: "S24/021",
    Status: "REVISE",
    Flight_Pair: "DD104/105",
    Route: "DMK-CEI v.v.",
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
    const { SSM_PLN, Status, Flight_Pair, Route, EFF_Date, End_Date, Frequency, Except, Messenger } = inputs;
    if (!SSM_PLN || !Status || !Flight_Pair || !Route || !EFF_Date || !End_Date) {
      return;
    }
    handleAddTodos(inputs);
    setInputs({
      SSM_PLN: "S24/021",
      Status: "REVISE",
      Flight_Pair: "DD104/105",
      Route: "DMK-CEI v.v.",
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
    { name: 'Flight_Pair', type: 'select', options: ["DD104/105", "DD126/127", "DD/142143", "DD324/325", "DD500/501", "DD524/525", "DD528/529", "DD570/571", "DD576/577"] },
    { name: 'Route', type: 'select', options: ["DMK-CEI v.v.", "DMK-CNX v.v.", "DMK-UBP v.v.", "DMK-HYD v.v.", "DMK-HKT v.v.", "DMK-URT v.v."] },
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

  const generateSSMPLNOptions = () => {
    const options = [];
    for (let i = 21; i <= 400; i++) {
      options.push(`S24/${String(i).padStart(3, '0')}`);
    }
    for (let i = 1; i <= 400; i++) {
      options.push(`W24/${String(i).padStart(3, '0')}`);
    }
    return options;
  };

  return (
    <form className="add-todo-container" onSubmit={handleSubmit}>
      <div className="input-row">
        <div className="input-group">
          <label htmlFor="SSM_PLN" style={{ fontStyle: 'italic' }}>SSM PLN</label>
          <select
            name="SSM_PLN"
            id="SSM_PLN"
            value={inputs.SSM_PLN}
            onChange={handleChange}
            className="add-todo-input"
          >
            {generateSSMPLNOptions().map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
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
            <label htmlFor={input.name}>{input.placeholder || input.name.replace('_', ' ')}</label>
            {input.type === 'select' ? (
              <select
                name={input.name}
                id={input.name}
                value={inputs[input.name]}
                onChange={handleChange}
                className="add-todo-input"
              >
                {input.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                value={inputs[input.name]}
                onChange={handleChange}
                className="add-todo-input"
              />
            )}
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

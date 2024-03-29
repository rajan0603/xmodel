import './App.css';
import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const modalRef = useRef();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const validateForm = () => {
    // Email validation
    if (email.indexOf('@') === -1) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    // Date of Birth validation
    const currentDate = new Date().toISOString().split('T')[0];
    if (dob > currentDate) {
      alert('Invalid date of birth. Date of birth cannot be in future.');
      return;
    }

    // If all validations pass, you can proceed with form submission or other actions
    // alert('Form submitted successfully!');
    // closeModal();
    setUsername("");
    setEmail("");
    setDob("");
    setPhone("");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Clicked outside the modal, close it
        setIsOpen(false);
        setUsername("");
        setEmail("");
        setDob("");
        setPhone("");
      }
    };

    // Attach the event listener when the modal is open
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Remove the event listener when the component unmounts or modal closes
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className='wrapper'>
      <h1>User Details Model</h1>
      <button onClick={openModal}>Open Form</button>

      {isOpen && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            {/* <span onClick={closeModal} className="close-btn">
              &times;
            </span> */}
            <h2>Fill Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validateForm();
              }}
            > 
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <br />

              <label htmlFor="email">Email Address:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />

              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <br />

              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
              <br />

              <button className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
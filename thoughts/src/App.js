import React, { useState } from 'react';
import Login from './pages/login';
import Register from './pages/register';
import './App.css';

function App() {
  const [registered, setRegistered] = useState(false);

  const handleRegisterClick = () => {
    setRegistered(true);
  };

  const handleLoginClick = () => {
    setRegistered(false);
  };

  return (
    <div className="App">
      {registered ? <Register /> : <Login />}
      {!registered && <p>Not registered? <button onClick={handleRegisterClick}>Register</button></p>}
      {registered && <p>Already registered? <button onClick={handleLoginClick}>Login</button></p>}
    </div>
  );
}

export default App;



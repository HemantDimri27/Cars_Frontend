import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { GlobalContext } from '../GlobalContext';
import { Link} from 'react-router-dom';

const Login = () => {

  const {loginUser, setLoginUser} = useContext(GlobalContext);

  console.log(`login status login: ${loginUser}`);


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const [responseMessage, setResponseMessage] = useState('');


  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const response = await axios.post('/api/auction/login', formData)
    console.log(response)
    setResponseMessage(response.data); 
    if(response.data.charAt(0) === 'U'){
      setLoginUser(true);
    }
  }

  // Inline styles as JavaScript objects
  const styles = {
    body: {
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      border: '1px solid white',
      padding: '20px',
      borderRadius: '5px',
      width: '300px',
      backgroundColor: '#333',
    },
    formTitle: {
      textAlign: 'center',
      marginBottom: '20px',
      color: 'white',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: 'white',
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid white',
      backgroundColor: '#444',
      color: 'white',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: 'white',
      color: 'black',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    responseMessage: {
      marginTop: '20px',
      color: 'white',
    },
    HomeButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input style={styles.input} type="email" id="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input style={styles.input} type="password" id="password" placeholder="Enter your password"  name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>

        {/* Show response message */}
        <p style={styles.responseMessage}>{responseMessage}</p>

        {/* Conditionally render Add Blog button if registration is successful */}
        {loginUser && (
          <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={styles.HomeButton}>Home</button>
        </Link>
        )}

      </div>
    </div>
  );
};

export default Login;

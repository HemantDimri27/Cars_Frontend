import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddCar = () => {
  
  const [formData, setFormData] = useState({
    company: '',
    model: '',
    model_year: undefined,
    base_price: undefined,
    max_price: 0,
    registration_no: '',
    RTO: '',
    owner: '',
    winner: '',
    image: undefined, 
  })

  const [responseMessage, setResponseMessage] = useState('');
  const [isLogined, setIsLogined] = useState(false);

  // Handle image file selection
  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData(prev => ({...prev, [name]: value}))
  }

   // Handle image file selection, coz you can't handle image like text, so remove value={...}
   const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    setFormData(prev => ({...prev, image: file})); 
  }
  


  const handleSubmit = async(event) => {
    event.preventDefault();

    // Create a FormData object to handle file uploads
    const data = new FormData();
    data.append('image', formData.image);
    data.append('title', formData.title);
    data.append('company', formData.company);
    data.append('model', formData.model);
    data.append('model_year', formData.model_year);
    data.append('base_price', formData.base_price);
    data.append('max_price', formData.max_price);
    data.append('registration_no', formData.registration_no);
    data.append('RTO', formData.RTO);
    data.append('owner', formData.owner);

    try {
      const response = await axios.post('/api/auction/addCar', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure form data is being sent
        }
      });
      console.log(response);
      setResponseMessage(response.data);
      setIsLogined(true);
    } catch (error) {
      console.error('Error uploading car:', error);
      setResponseMessage('Error uploading car');
    }
  }



  // Inline styles as JavaScript objects
  const styles = {
    body: {
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '70px',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      border: '1px solid white',
      padding: '20px',
      borderRadius: '5px',
      width: '400px',
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
    textarea: {
      width: '100%',
      height: '100px',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid white',
      backgroundColor: '#444',
      color: 'white',
      resize: 'none',
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
        <h2 style={styles.formTitle}>Add Car</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="image">Upload Image</label>
            <input style={styles.input} type="file" id="image" accept="image/*" name="image"  onChange={handleImageChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="company" >Company</label>
            <input style={styles.input} type="text" id="company" placeholder="Enter car company" name="company" value={formData.company} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="model" >Model</label>
            <input style={styles.input} type="text" id="model" placeholder="Enter car model" name="model" value={formData.model} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="model_year" >Model_year</label>
            <input style={styles.input} type="number" id="model_year" placeholder="Enter car model_year" name="model_year" value={formData.model_year} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="base_price" >Base Price</label>
            <input style={styles.input} type="number" id="base_price" placeholder="Enter car base_price" name="base_price" value={formData.base_price} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="registration_no" >registration_no</label>
            <input style={styles.input} type="text" id="registration_no" placeholder="Enter car registration_no" name="registration_no" value={formData.registration_no} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="RTO" >RTO</label>
            <input style={styles.input} type="text" id="RTO" placeholder="Enter car RTO" name="RTO" value={formData.RTO} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="owner" >Owner</label>
            <input style={styles.input} type="text" id="owner" placeholder="Enter car owner" name="owner" value={formData.owner} onChange={handleChange} />
          </div>
          <button type="submit" style={styles.button}>Add Car</button>
        </form>

        {/* Show response message */}
        <p style={styles.responseMessage}>{responseMessage}</p>

        {/* Conditionally render Add car button if registration is successful */}
        {isLogined && (
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={styles.HomeButton}>Home</button>
          </Link>
        )}

      </div>
    </div>
  );
};

export default AddCar;

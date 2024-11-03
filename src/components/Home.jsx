import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

const Home = () => {

  const [car, setCars] = useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('/api/auction')                      // proxy
    .then((res)=>{
      console.log("inside res");
      setCars(res.data)
    })

    console.log("inside useEffect");
  }, [])

  // console.log("The cars are: ", car);


  const { setCarsData , loginUser} = useContext(GlobalContext);

  console.log(`login status Home: ${loginUser}`);
  const handleCardClick = (car) => {
    setCarsData(car);
    navigate(`/car`);
  };



  // Inline styles as JavaScript objects
  const styles = {
    body: {
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      height: '100%',
      // display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#333',
      padding: '10px',
    },
    navbarTitle: {
      margin: 0,
      color: 'white',
    },
    authButtons: {
      display: 'flex',
    },
    button: {
      backgroundColor: 'white',
      color: 'black',
      border: 'none',
      padding: '5px 10px',
      marginLeft: '10px',
      cursor: 'pointer',
    },
    carCardsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center', 
      marginTop: '20px',
    },
    
    carCard: {
      display: 'flex',
      flexDirection: 'row',
      width: '80vw', 
      height: '150px',
      border: '1px solid white',
      padding: '10px',
      backgroundColor: '#444',
      borderRadius: '5px',
      overflow: 'hidden', 
    },
    
    carCardImage: {
      width: '300px', 
      height: '100%',
      objectFit: 'cover', // Ensures image fits in the box while covering
    },
    
    carCardDetails: {
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'space-between', // Keeps title at the top and content below
      marginLeft: '50px',
      width: '100%',
    },
    
    carCardTitle: {
      width: '100%',
      margin: 0,
      fontWeight: 'bold', 
      color: 'white',
    },
    
    carCardContent: {
      marginTop: '5px',
      color: 'white',
      // overflow: 'hidden',
      height: '8px', // Fixed height for content area
    },
    
  };

  return (
    <div style={styles.body}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.navbarTitle}>Car Auction</h2>
        <div style={styles.authButtons}>
          <Link to="/addCar" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>Add Car</button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>Register</button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>Login</button>
          </Link>
        </div>
      </nav>

      {/* car Cards Container */}
      <div style={styles.carCardsContainer}>
        {car.map((car) => (
          <div style={styles.carCard} key={car._id} onClick={() => handleCardClick(car)} >
            <div>
              <img src={car.image} alt={car.title} style={styles.carCardImage} />
            </div>
            <div style={styles.carCardDetails}>
              <h3 style={styles.carCardTitle}>{car.company} {car.model}</h3>
              <p style={styles.carCardContent}>Company : {car.company}</p>
              <p style={styles.carCardContent}>Model : {car.model}</p>
              <p style={styles.carCardContent}>Year : {car.model_year}</p>
              <p style={styles.carCardContent}>base_price : {car.base_price}</p>
              {/* <p style={styles.carCardContent}>max_price : {car.max_price}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

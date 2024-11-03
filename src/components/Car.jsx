import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../GlobalContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Car = () => {

  const {carsData, loginUser} = useContext(GlobalContext);


  const navigate = useNavigate();
  useEffect(() => {
    if (!loginUser) {
      navigate('/login'); // Redirect to login
    }
  }, [loginUser, navigate]); // avoid repeated calls  


  const [user, setUser] = useState([]);
  useEffect(()=>{
    axios.get('/api/auction/users')
    .then((res)=>{setUser(res.data)})
  },[])


  const [userData, sestUserData] = useState([]);
  const [bid, setBid] = useState();
  const [message, setMessage] = useState('');
  const [maxPrice, setMaxPrice] = useState(carsData.max_price)


  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if(bid > maxPrice || bid == 0){
        setMaxPrice(bid);
        // update max in DB
        const data = { maxBid: bid, id: carsData._id, winner: userData.name}
        const response = axios.put('/api/auction/updateMax', data)
        setMessage("You have max Bid")
      } else {
        setMessage("Not a max")
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleChange = (e) => setBid(e.target.value)



  const style = {
    body : {
      margin: '0px',
      height: '100%',
      padding: '50px',
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
    },
    
    biddibgContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid white',
      borderRadius: '5px',
      backgroundColor: '#444',

      // display: 'flex',
      // flexDirection: 'column',
    },

    carImage: {
      width: '100%',
      height: '600px',
      marginBottom: '20px',
      margin: '10px 0px',

      objectFit: 'cover',
    },

    carDetailContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      border: '1px solid white',
    },

    carDetail: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      border: '1px solid white',
    },

    col1: {
      width: '50%',
      height: 'auto',
      border: '1px solid white',
    },

    col2: {
      width: '50%',
      height: 'auto',
      border: '1px solid white',
      // display: 'flex',
      // flexDirection: 'column',
    },

    buttons: {
      border: '1px solid white',
      width: '100px',
    },

    bidContainer: {
      display: 'flex',
      justifyContent: 'space-between',

      border: '1px solid white',
    },

    users: {
      display: 'flex',
      flexDirection: 'column',
      width: '30%',
      height: '20 0PX',
      border: '1px solid white',
    },

    userBidding: {
      width: '70%', 
      border: '1px solid white',
    },
  };

  return (
    <div className='body' style={style.body}>
      <div className='biddingContainer' style={style.biddibgContainer}>

        <img src={carsData.image} alt={carsData.title} style={style.carImage} />

        <div className='carDetailsContainer' style={style.carDetailContainer}>
          <div style={style.carDetail}>
            <div style={style.col1}>
              <p>Company : {carsData.company}</p>
              <p>Year : {carsData.model_year}</p>
              <p>RTO : {carsData.RTO} </p>
              <p>Base Price : {carsData.base_price}</p>
            </div>
            <div style={style.col2}> 
              <p>Model : {carsData.model}</p>
              <p>Registration : {carsData.registration_no} </p>
              <p>Owner : {carsData.owner}</p>
              <p>Max price : {maxPrice || carsData.max_price}</p>
            </div>
          </div>
          <div style={style.buttons}>
            <button>close</button>
            <p>max : {maxPrice}</p>
            <p>winner : {carsData.winner}</p>
            <button>reset</button>
          </div>
        </div>

        <div className='bidContainer' style={style.bidContainer}>
          <div style={style.users}>
            {user.map((user)=>(
              <button style={{height: '30px'}} key={user._id} onClick={()=>{sestUserData(user)}}>{user.name}</button>
            ))}
          </div>
          <div style={style.userBidding}>bidding details
            <p>User name: {userData.name}</p>
            <p>Uses email: {userData.email}</p>
            <p>user Address: {userData.address} </p>
            <form style={{display: 'flex'}} onSubmit={handleSubmit}>
            <label style={{}} htmlFor="bid">Your Bid : </label>
            <input style={{margin: '0 20px'}} type="number" id="bid" placeholder={maxPrice} name="bid" value={bid} onChange={handleChange} required />
            <button type='submit' style={{padding: '0 20px', margin: '0 30px'}}>Bid</button>
            </form>
            <p>Bid status : {message}</p>
          </div>
        </div>

      </div>
    </div>
  )

};

export default Car;

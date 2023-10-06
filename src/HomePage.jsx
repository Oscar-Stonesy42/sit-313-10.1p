import React from 'react';
import './App.css';
import image from './try this.jpg'
import twitter_image from './twitter.png'
import facebook_image from './facebook.png'
import instagram_image from './instagram.jpg'
import CardList from './CardList';
import LoginPage from './routes/LoginPage'
import {Link} from "react-router-dom"
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function HomePage(){
  
  const [email,setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error('Please fill email');
    }
    try{
      setLoading(true);
      const { data } = await axios.post(`/`, {
        email
      });
      setLoading(false);
      toast.success(data.message);

    } catch (err) {
      setLoading(false);
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }
  return (
    <div>
    <div className='top-header'>
      <Link className='left-text' to='/'>Devlink Marketplace</Link>
      <h1 className='right-text'>Find DEV</h1>
      <h1 className='right-text'>Find Jobs</h1>
      <Link className='right-text' to='/login'>Login</Link>
      <Link className='right-text' to='/create'>Create Account</Link>
    </div>
    
    
    <img src={image} alt='Header Image' className='image'></img>
    

    <h1 className='freelancer-header'>Featured FreeLancers</h1>
    <CardList cardLimit={3} showLast={false}/>
    <button className='see-more' type='submit'>See More</button>
    <br></br>
    <h1 className='freelancer-header'>Featured Customers</h1>
    <CardList cardLimit={3} showLast={true}/>
    <button className='see-more' type='submit'>See All Customers</button>
    <br></br>

    <div className='Email-Section'>
      <ToastContainer position="bottom-center" limit={1} />
      <h1 className='text'>SIGN UP FOR OUR DAILY INSIDER</h1>
      <form onSubmit={submitHandler} >
        <input 
          onChange={(e) => setEmail(e.target.value)} 
          type = 'email' name='email' placeholder='Enter your email here' className='entry-box'
          ></input>
        <button disabled={loading} className='Submit Button' type='submit'>
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>

    <div className='Footer'>
      <div className='Dev-Footer'>
        <h1>For Dev</h1>
        <p1>How it works</p1>
        <br></br>
        <p1>How to create a profile</p1>
        <br></br>
        <p1>Find jobs</p1>
      </div>
      <div className='Client-Footer'>
        <h1>For Client</h1>
        <p1>How it works</p1>
        <br></br>
        <p1>How to post a job</p1>
        <br></br>
        <p1>Find Dev</p1>
      </div>
      <div className='Socials'>
        <h1>Stay Connected</h1>
        <img src={facebook_image} className='Social_Images'/>
        <img src={instagram_image} className='Social_Images'/>
        <img src={twitter_image} className='Social_Images'/>
      </div>
      <div className='DEVLink'>
        <h1 className='devlink_title'>DEVLink</h1>
        <br></br>
        <p className='devlink_text'>Privacy Policy</p>
        <p className='devlink_text'>Terms</p>
        <p className='devlink_text'>Code Of Conduct</p>
      </div>
    </div>
    </div>
  )
}

export default HomePage;
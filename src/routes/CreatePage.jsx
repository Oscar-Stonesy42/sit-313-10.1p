import React,{useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import image from './try this.jpg'
import twitter_image from './twitter.png'
import facebook_image from './facebook.png'
import instagram_image from './instagram.jpg'
import Input from './Input'
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from './utils/firebase'
import './Signup.css'
import './App.css'

const Signup = (props)=>
{
    const [contact, setContact] = useState({
        displayName:'',
        email: '',
        password: '',
        confirmPassword:''
    })
   
const {displayName, email, password, confirmPassword} = contact;

const navigate = useNavigate();

console.log(contact);

const handleChange = (event)=>{
    const {name, value} = event.target
    setContact ((preValue)=>{  
    return {
    ...preValue,
    [name]: value
    }
    })
}
const handleSubmit = async(event) =>
{
    event.preventDefault();

    if (password !== confirmPassword){
        alert('Passwords do not match!')
        return;
    }

    try{
        const {user} = await createAuthUserWithEmailAndPassword(email, password)
        await createUserDocFromAuth (user, {displayName});
        navigate('/login');
    }
    catch(error){
        console.log('error in creating user', error.message)

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
    
    <div className= 'header-div'>
        <Input className='button'
        name= 'displayName'
        type= 'text'
        placeholder ='Name'
        onChange = {handleChange}
        value = {contact.displayName}
        />
            <br></br>
        <Input className='button'
        name= 'email'
        type= 'email'
        placeholder ='Email'
        onChange = {handleChange}
        value = {contact.email}
        />

        <br></br>

        <Input className='button'
        name='password'
        type= 'password'
        placeholder ='Password'
        onChange = {handleChange}
        value = {contact.password}
        />
        <br></br>

        <Input className='button'
        name='confirmPassword'
        type= 'password'
        placeholder ='Confirm Password'
        onChange = {handleChange}
        value = {contact.confirmPassword}
        />

        <br></br>

        <button onClick={handleSubmit}>
            Sign up
        </button>

        <br></br>
        <br></br>

        <Link to='/login'>
            Login
        </Link>  
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

export default Signup
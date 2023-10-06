import React,{useState, useContext} from 'react'
import {Link} from "react-router-dom"
import image from './try this.jpg'
import twitter_image from './twitter.png'
import facebook_image from './facebook.png'
import instagram_image from './instagram.jpg'
import Input from './Input'
import { signInWithGooglePopup, createUserDocFromAuth, signinAuthUserWithEmailAndPassword} from './utils/firebase'


const Login = (props)=>{
    const logGoogleUser = async () =>{
     const {user} = await signInWithGooglePopup();
     const userDocRef = await createUserDocFromAuth(user)
    }
     
     const [contact, setContact] = useState({
         email: '',
         password: ''
     })
    
     const {email, password} = contact

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

        try{
            
            const {user} = await signinAuthUserWithEmailAndPassword(email,password);
        }
        catch(error){
            console.log('error in login', error.message)

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

        <h2 className='button-text'>Your Name</h2>
        <Input 
        name= 'email'
        type= 'text'
        placeholder ='email'
        onChange = {handleChange}
        value = {contact.email}
        />

        <br></br>
        <h2 className='button-text'>Your Password</h2>
        <Input 
        name='password'
        type= 'password'
        placeholder ='password'
        onChange = {handleChange}
        value = {contact.password}
        />

        <br></br>

        <button onClick={handleSubmit}>
            Sign in
        </button>
        <br></br>
        <button onClick={logGoogleUser}>
            Log in with Google
        </button>
       <br></br>
       <br></br>
       
        <br></br>
        <br></br>

        <Link to='/create'>
            Sign up instead
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

export default Login
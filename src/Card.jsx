import React from 'react';
import './Card.css'
import image1 from './portrait 1.jpg'

const  Card = (props) =>
{
    return <div className="column">
    <img src={image1} alt="staff" className='image'/>
    <h3 className='name'>{props.name}</h3>
    <p className='position'>{props.position}</p>
    <p className='description'>{props.description}</p>
    <p className='star'>{props.star}</p>
    </div>
}

export default Card;
import React from 'react';
import Card from './Card'
import staffList from './staffList'
import './Card.css'

function cardComponent (staff , i){
    return <Card
        key = {staff.key}
        avatar = {staff.avatar}
        name = {staff.name}
        position = {staff.position}
        description = {staff.description}
        star = {staff.star}
    />
}


const  CardList = ({cardLimit, showLast}) =>
{
    let staffToDisplay = staffList;

    if (showLast) {
        staffToDisplay = staffList.slice(-cardLimit); // Use negative index to get last elements
    } else {
        staffToDisplay = staffList.slice(0, cardLimit);
    }

    return <div className="row">
    {staffToDisplay.map(cardComponent)}
    </div>
}

export default CardList;
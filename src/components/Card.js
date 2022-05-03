import React from "react";

function Card(props) {
    function handleClick() {
        props.onView(props.card)
    }

    return (
        <li className="photo-card" key={props.card._id} id={props.card._id} onClick={handleClick}>

            <div className="photo-card__delete"></div>
            <img src={props.card.link} alt={props.card.name} className="photo-card__img" />
            <div className="photo-card__bottom">
                <h2 className="photo-card__title">{props.card.name}</h2>
                <div className="photo-card__like-container">
                    <button className="photo-card__like" type="button"></button>
                    <p className="photo-card__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>


    );
}

export default Card;
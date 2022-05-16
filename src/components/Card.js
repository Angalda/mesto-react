import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    

    // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  
   // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
     `photo-card__delete ${isOwn? 'photo-card__delete_visible' : ''}`
   ); 

   // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

   // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `photo-card__like ${isLiked? 'photo-card__like_active' : ''}`; 


    function handleClick() {
        props.onView(props.card)
    }

    function handleLikeClick(){
        props.onCardLike(props.card)
    }

    function handleDeleteClick(){
        props.onCardDelete(props.card)
    }

    

    return (
        <li className="photo-card" id={props.card._id} key={props.card._id} >

            <div className={cardDeleteButtonClassName} onClick={handleDeleteClick}></div>
            <img src={props.card.link} alt={props.card.name} className="photo-card__img" onClick={handleClick}/>
            <div className="photo-card__bottom">
                <h2 className="photo-card__title">{props.card.name}</h2>
                <div className="photo-card__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="photo-card__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>


    );
}

export default Card;
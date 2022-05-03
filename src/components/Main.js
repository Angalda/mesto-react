import React from "react";
import { api } from "../utils/Api";
import Card from "./Card";
import editImg from "../images/edit.svg";


function Main({ onEditAvatar, onEditPofile, onNewPlace, onView }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const initialArray = [api.getProfile(), api.getCardInfo()]


    Promise.all(initialArray)
      .then(
        ([userData, cardList]) => {
          setUserName(userData.name);
          setUserDescription(userData.about);
          setUserAvatar(userData.avatar);

          const newCard = cardList.map((data) => {
            return {
              name: data.name,
              link: data.link,
              likes: data.likes,
              _id: data._id
            }

          })
          setCards(newCard);
        })

      .catch((err) => console.log(err))
  }, []);

  return (
    <div className="Main">
      <>
        <main className="main">
          {/* ___________________profile__________________________*/}
          <section className="profile">
            <div className="profile__contain">
              <img src={userAvatar} alt="аватар" className="profile__avatar" />
              <button className="profile__avatar-edit" type="button" onClick={onEditAvatar}>
                <img src={editImg} alt="кнопка редактирования" className="profile__avatar-edit-img" />
              </button>

              <div className="profile__info">
                <div className="profile__name-container">
                  <h1 className="profile__name">{userName}</h1>
                  <button className="profile__redacted-button" type="button" onClick={onEditPofile}></button>
                </div>

                <p className="profile__description">{userDescription}</p>
              </div>
            </div>

            <button className="profile__add-button" type="button" onClick={onNewPlace}></button>
          </section>
          {/*___________________photo-cards__________________________*/}
          <section className="photo-cards">
            <ul className="photo-cards__list">
              {cards.map((card) => (<Card card={card} key={card._id} onView={onView} />))}
            </ul>
          </section>
        </main>
      </>
    </div>
  );
}

export default Main;
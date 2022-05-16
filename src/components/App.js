import React, { useState } from 'react';


import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { api } from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function App() {



    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isAddPlace, setIsAddPlace] = useState(false);
    const [isEditAvatar, setIsEditAvatar] = useState(false);
    const [isImgView, setIsImgView] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    React.useEffect(() => {
    
    
        Promise.all( [api.getProfile(), api.getCardInfo()])
          .then(
            ([userData, cardList]) => {
              setCurrentUser(userData); 
              
              const newCard = cardList.map((data) => {
                return {
                  ...data,
                  isOpen: false,
                }
    
              })
              setCards(newCard);
            })

          .catch((err) => console.log(err))
      }, []);
    
    function handleCardLike (card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
    
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeStatusLike(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
    }

    function handleCardDelete (card) {
        api.deleteCard(card._id)
        .then((res)=> {
            setCards((state)=>
               state.filter((c)=>c._id!== card._id)
            )

        })
        .catch((err) => console.log(err));

    }

    function handleEditProfileClick() {
        setIsEditProfile(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlace(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatar(true);
    }

    function handleImgClick(card) {
        setIsImgView(true);
        setSelectedCard(card)
    }

    function handleClosePopup() {
        setIsEditProfile(false);
        setIsAddPlace(false);
        setIsEditAvatar(false);
        setIsImgView(false);
    }

    return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
            <>
                <div className="page">
                    <Header />
    const [cards, setCards] = useState([]);
    const [cards, setCards] = useState([]);
                    <Main onEditAvatar={handleEditAvatarClick} onEditPofile={handleEditProfileClick} onNewPlace={handleAddPlaceClick} onView={handleImgClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>

                    <Footer />
                </div>
                <ImagePopup card={selectedCard} isOpen={isImgView} closePopup={handleClosePopup} />

                <PopupWithForm isOpen={isEditProfile} name={'profile'} closePopup={handleClosePopup} title={'Редактировать профиль'} textButton={'Сохранить'}>
                    <input type="text" className="pop-up__input pop-up__input_value_name" id="profile-name" name="name"
                        placeholder="Имя" required minLength="2" maxLength="40"></input>
                    <span className="pop-up__span-error pop-up__span-error_visible profile-name-error"
                        id="profile-name-error"></span>
                    <input type="text" className="pop-up__input pop-up__input_value_description" id="profile-description"
                        name="description" placeholder="О себе" required minLength="2"
                        maxLength="200"></input>
                    <span className="pop-up__span-error pop-up__span-error_visible profile-description-error"
                        id="profile-description-error"></span>
                </PopupWithForm>
                <PopupWithForm isOpen={isAddPlace} name={'cards'} closePopup={handleClosePopup} title={'Новое место'} textButton={'Создать'}>
                    <input type="text" className="pop-up__input pop-up__input_value_card-title" id="card-title"
                        name="card-title" placeholder="Название" required minLength="2" maxLength="30"></input>

                    <span className="pop-up__span-error pop-up__span-error_visible card-title-error"
                        id="card-title-error"></span>

                    <input type="url" className="pop-up__input pop-up__input_value_card-link" id="card-link"
                        name="card-link" placeholder="Ссылка на картинку" required></input>

                    <span className="pop-up__span-error pop-up__span-error_visible card-link-error"
                        id="card-link-error"></span>
                </PopupWithForm>
                <PopupWithForm isOpen={isEditAvatar} name={'avatar'} closePopup={handleClosePopup} title={'Обновить аватар'} textButton={'Сохранить'}>
                    <input type="url" className="pop-up__input pop-up__input_value_avatar-link" id="avatar-link"
                        name="link" placeholder="Ссылка на картинку" required />

                    <span className="pop-up__span-error pop-up__span-error_visible avatar-link-error"
                        id="avatar-link-error"></span>
                </PopupWithForm>


                {/*___________________pop-up-delete__________________________ */}
                <div className="pop-up pop-up_type_delete">

                    <div className="pop-up__container">
                        <button className="pop-up__closed pop-up__closed_delete" type="button"></button>
                        <form action="URL" className="pop-up__form pop-up__form_delete" method="get" name="form" noValidate>
                            <h2 className="pop-up__title pop-up__title_delete">Вы уверены?</h2>
                            <button type="submit" className="pop-up__submit-form pop-up__submit-form_delete">Да</button>

                        </form>
                    </div>
                </div>


            </>
        </div>
    </CurrentUserContext.Provider>
    );
}

export default App;

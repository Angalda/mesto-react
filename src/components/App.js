import React, { useState } from 'react';
import { api } from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

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

    function handleUpdateUser(info) {
        api.postUserInfo(info)
        .then((res)=>{
            setCurrentUser(res);
            handleClosePopup();

        })
        .catch((err) => console.log(err))
    }

    function handleUpdateAvatar (obj) {
        api.changeAvatar(obj)
        .then((res)=>{
            setCurrentUser(res);
            handleClosePopup();

        })
        .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(obj) {
        api.postCardInfo(obj)
        .then((newCard)=>{
            setCards([newCard, ...cards]);
            handleClosePopup();
        })
        .catch((err) => console.log(err))
    }

    return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
            <>
                <div className="page">
                    <Header />
                    <Main onEditAvatar={handleEditAvatarClick} onEditPofile={handleEditProfileClick} onNewPlace={handleAddPlaceClick} onView={handleImgClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
                    <Footer />
                </div>

                <ImagePopup card={selectedCard} isOpen={isImgView} closePopup={handleClosePopup} />
                <EditProfilePopup isOpen={isEditProfile} onClose={handleClosePopup} onUpdateUser = {handleUpdateUser}/>              
                <EditAvatarPopup isOpen={isEditAvatar} onClose={handleClosePopup} onUpdateAvatar = {handleUpdateAvatar}/> 
                <AddPlacePopup isOpen={isAddPlace} onClose={handleClosePopup} onAddPlace = {handleAddPlaceSubmit}/> 

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

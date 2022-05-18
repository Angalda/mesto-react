import React, { useState } from 'react';
import { api } from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {

    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isAddPlace, setIsAddPlace] = useState(false);
    const [isEditAvatar, setIsEditAvatar] = useState(false);
    const [isImgView, setIsImgView] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    React.useEffect(() => {
        Promise.all([api.getProfile(), api.getCardInfo()])
            .then(
                ([userData, cardList]) => {
                    setCurrentUser(userData);
                    setCards(cardList);
                })
            .catch((err) => console.log(err))
    }, []);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeStatusLike(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(err))
    }

    function handleCardDelete({ card }) {
        api.deleteCard(card._id)
            .then((res) => {
                setCards((state) =>
                    state.filter((c) => c._id !== card._id)
                )
                handleClosePopup();
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

    function handleDeleteClick(card) {
        setIsDelete(true);
        setSelectedCard(card)
    }

    function handleClosePopup() {
        setIsEditProfile(false);
        setIsAddPlace(false);
        setIsEditAvatar(false);
        setIsImgView(false);
        setIsDelete(false);
    }

    function handleUpdateUser(info) {
        api.postUserInfo(info)
            .then((res) => {
                setCurrentUser(res);
                handleClosePopup();

            })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(obj) {
        api.changeAvatar(obj)
            .then((res) => {
                setCurrentUser(res);
                handleClosePopup();

            })
            .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(obj) {
        api.postCardInfo(obj)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                handleClosePopup();
            })
            .catch((err) => console.log(err))
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditPofile={handleEditProfileClick}
                    onNewPlace={handleAddPlaceClick}
                    onView={handleImgClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteClick}
                />
                <Footer />
                <ImagePopup
                    card={selectedCard}
                    isOpen={isImgView}
                    closePopup={handleClosePopup}
                />
                <EditProfilePopup
                    isOpen={isEditProfile}
                    onClose={handleClosePopup}
                    onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatar}
                    onClose={handleClosePopup}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={isAddPlace}
                    onClose={handleClosePopup}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <DeleteCardPopup
                    card={selectedCard}
                    isOpen={isDelete}
                    onClose={handleClosePopup}
                    onDelete={handleCardDelete}
                />
            </div>

        </CurrentUserContext.Provider>
    );
}

export default App;

import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';


function App() {

    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isAddPlace, setIsAddPlace] = useState(false);
    const [isEditAvatar, setIsEditAvatar] = useState(false);
    const [isImgView, setIsImgView] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});

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
        <div className="App">
            <>
                <div className="page">
                    <Header />
                    <Main onEditAvatar={handleEditAvatarClick} onEditPofile={handleEditProfileClick} onNewPlace={handleAddPlaceClick} onView={handleImgClick} />

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
                <PopupWithForm isOpen={isAddPlace} name={'cards'} closePopup={handleClosePopup} title={'Новое место'} textButton={'Сохранить'}>
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
    );
}

export default App;

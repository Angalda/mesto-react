

export const profileRedactionButton = document.querySelector('.profile__redacted-button');
export const popUpInputName = document.querySelector('.pop-up__input_value_name');
export const popUpInputDescription = document.querySelector('.pop-up__input_value_description');
export const popUpFormProfile = document.querySelector('.pop-up__form_profle');
export const popUpFormCards = document.querySelector('.pop-up__form-cards');
export const popUpFormAvatar = document.querySelector('.pop-up__form_avatar');
export const addButton = document.querySelector('.profile__add-button');
//export const profileName = document.querySelector('.profile__name');
//export const profileAvatar = document.querySelector('.profile__avatar');
//export const profileDescription = document.querySelector('.profile__description');

//Валидатор
export const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__submit-form',
    inactiveButtonClass: 'pop-up__submit-form_disabled',
    inputErrorClass: 'pop-up__input_warning',
    errorClass: 'pop-up__span-error_visible'
};
import '../pages/index.css';

import {
  createCard,
  removeCard,
  onLikeButtonHandler
} from './components/card.js';

import {
  openPopup,
  closePopup
} from './components/modal.js';

import { enableValidation,
  resetValidation
} from './components/validation.js';

import { fetchInitialCards,
  getCurrentUserData,
  editUserProfile,
  editUserAvatar,
  addNewCard,
  requestDeleteCard,
  addUserlikes,
  requestdeleteUserLike
} from './components/api.js';

const validationSettings ={
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const userData = {
  userName: document.querySelector(".profile__title"),
  userAbout: document.querySelector(".profile__description"),
  userAvatar: document.querySelector(".profile__image"),
}

const promises = [getCurrentUserData(), fetchInitialCards()];

const profile = document.querySelector('.profile');

const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');

const placesContainer = document.querySelector('.places__list');

const popupTypeEditProfileData = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeAvatar = document.querySelector('.popup_type_edit-avatar');

const nameInput = popupTypeEditProfileData.querySelector('.popup__input_type_name');
const jobInput = popupTypeEditProfileData.querySelector('.popup__input_type_description');

const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const form = popupTypeNewCard.querySelector('.popup__form');

const inputName = form.querySelector('.popup__input_type_card-name');
const inputUrl = form.querySelector('.popup__input_type_url');

const inputUserAvatar = popupTypeAvatar.querySelector('.popup__input_type_avatar');
const formUserAvatar = popupTypeAvatar.querySelector('.popup__form');
const userAvatar = profile.querySelector('.profile__image');

function userInformation(user, userData) {
  userData.userName.textContent = user.name;
  userData.userAbout.textContent = user.about;
  userData.userAvatar.setAttribute('style', `background-image: url(${user.avatar});`)
}

function changeLoadingStatusButton(isLoading, button){
  if(isLoading){
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function onCardImageHandler(link, name) {
  popupImage.src = link;
  popupCaption.textContent = name;

  openPopup(popupTypeImage);
}

function openPopupTypeEditProfileData() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  resetValidation(popupTypeEditProfileData, validationSettings);

  openPopup(popupTypeEditProfileData);
}

function submitProfileData(evt) {
  evt.preventDefault();

  const loadingStatusButton = evt.target.querySelector('.popup__button');

  changeLoadingStatusButton(true, loadingStatusButton);

  editUserProfile(nameInput.value, jobInput.value)
  .then(user => {
    editUserProfile(user.name, user.about);
    closePopup(popupTypeEditProfileData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    changeLoadingStatusButton(false, loadingStatusButton);
  });
}

function openPopupTypeNewCard() {
  openPopup(popupTypeNewCard);
  form.reset();
  resetValidation(popupTypeNewCard, validationSettings);
}

function submitNewCard(evt) {
  evt.preventDefault();

  const loadingStatusButton = evt.target.querySelector('.popup__button');

  changeLoadingStatusButton(true, loadingStatusButton);

  addNewCard(inputName.value, inputUrl.value)
  .then(card => {
    const newCard = createCard(card, card.owner._id, deleteCard, changeLikeStatus, onCardImageHandler);
    placesContainer.prepend(newCard);
    closePopup(popupTypeNewCard);
    form.reset();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    changeLoadingStatusButton(false, loadingStatusButton);
  });
}

function openPopupTypeEditUserProfileAvatar() {
  openPopup(popupTypeAvatar);
  formUserAvatar.reset();
  resetValidation(popupTypeAvatar, validationSettings);
}

function submitUserProfileAvatar(evt) {
  evt.preventDefault();

  const avatarUrl = inputUserAvatar.value;
  const loadingStatusButton = evt.target.querySelector('.popup__button');

  userAvatar.setAttribute('style', `background-image: url(${avatarUrl});`)

  changeLoadingStatusButton(true, loadingStatusButton);

  editUserAvatar(avatarUrl)
  .then(user => {
    editUserAvatar(user.avatar);
    closePopup(popupTypeAvatar);
    formUserAvatar.reset();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    changeLoadingStatusButton(false, loadingStatusButton);
  });
}

function renderCard(cardElement) {
  placesContainer.append(cardElement);
}

function deleteCard(cardOnDel, cardId) {
  requestDeleteCard(cardId)
  .then(() => {
      removeCard(cardOnDel);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
}

function changeLikeStatus (likeButton, likeCount, userId,) {
  if(likeButton.classList.contains("card__like-button_is-active")){
    requestdeleteUserLike(userId)
    .then((card) => {
      onLikeButtonHandler(likeButton, likeCount, card.likes.length);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
  } else {
    addUserlikes(userId)
    .then((card) => {
      onLikeButtonHandler(likeButton, likeCount, card.likes.length);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
  }
}

Promise.all(promises)
  .then((results) => {
    userInformation(results[0], userData);
    results[1].forEach(element => {
      renderCard(createCard(element, results[0]._id, deleteCard, changeLikeStatus, onCardImageHandler));
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

enableValidation(validationSettings);

editButton.addEventListener('click', openPopupTypeEditProfileData);
addButton.addEventListener('click', openPopupTypeNewCard);
userAvatar.addEventListener('click', openPopupTypeEditUserProfileAvatar);

popupTypeEditProfileData.addEventListener('submit', submitProfileData);
popupTypeNewCard.addEventListener('submit', submitNewCard);
popupTypeAvatar.addEventListener('submit', submitUserProfileAvatar);

import '../pages/index.css';

import { initialCards } from './components/cards.js';

import {
  createCard,
  renderCard,
  removeCard,
  onLikeButtonHandler,
  onCardImageHandler
} from './components/card.js';

import {
  openPopup,
  closePopup
} from './components/modal.js';

const profile = document.querySelector('.profile');

const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');

export const placesContainer = document.querySelector('.places__list');

const popupTypeEditProfileData = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');

function openPopupTypeEditProfileData() {
  const nameInput = popupTypeEditProfileData.querySelector('.popup__input_type_name');
  const jobInput = popupTypeEditProfileData.querySelector('.popup__input_type_description');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupTypeEditProfileData);
}

function submitProfileData(evt) {
  evt.preventDefault();

  const nameInput = popupTypeEditProfileData.querySelector('.popup__input_type_name');
  const jobInput = popupTypeEditProfileData.querySelector('.popup__input_type_description');

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupTypeEditProfileData);
}

function openPopupTypeNewCard() {
  openPopup(popupTypeNewCard);
}

function submitNewCard(evt) {
  evt.preventDefault();

  const form = popupTypeNewCard.querySelector('.popup__form');
  const inputName = form.querySelector('.popup__input_type_card-name');
  const inputUrl = form.querySelector('.popup__input_type_url');

  const cardData = {
    name: inputName.value,
    link: inputUrl.value,
  };

  const newCard = createCard(cardData, removeCard, onLikeButtonHandler, onCardImageHandler);

  placesContainer.prepend(newCard);
  closePopup(popupTypeNewCard);
  form.reset();
}

initialCards.forEach((element) => {
  renderCard(createCard(element, removeCard, onLikeButtonHandler, onCardImageHandler));
});

editButton.addEventListener('click', openPopupTypeEditProfileData);
addButton.addEventListener('click', openPopupTypeNewCard);

popupTypeEditProfileData.addEventListener('submit', submitProfileData);
popupTypeNewCard.addEventListener('submit', submitNewCard);
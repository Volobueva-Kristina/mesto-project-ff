import '../pages/index.css';

import { initialCards } from './components/cards.js';

import {
  createCard,
  removeCard,
  onLikeButtonHandler
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

const placesContainer = document.querySelector('.places__list');

const popupTypeEditProfileData = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const nameInput = popupTypeEditProfileData.querySelector('.popup__input_type_name');
const jobInput = popupTypeEditProfileData.querySelector('.popup__input_type_description');

const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const form = popupTypeNewCard.querySelector('.popup__form');
const inputName = form.querySelector('.popup__input_type_card-name');
const inputUrl = form.querySelector('.popup__input_type_url');

function onCardImageHandler(link, name) {
  popupImage.src = link;
  popupCaption.textContent = name;

  openPopup(popupTypeImage);
}

function openPopupTypeEditProfileData() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupTypeEditProfileData);
}

function submitProfileData(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupTypeEditProfileData);
}

function openPopupTypeNewCard() {
  openPopup(popupTypeNewCard);
}

function submitNewCard(evt) {
  evt.preventDefault();

  const cardData = {
    name: inputName.value,
    link: inputUrl.value,
  };

  const newCard = createCard(cardData, removeCard, onLikeButtonHandler, onCardImageHandler);

  placesContainer.prepend(newCard);
  closePopup(popupTypeNewCard);
  form.reset();
}

function renderCard(cardElement) {
  placesContainer.append(cardElement);
}

initialCards.forEach((element) => {
  renderCard(createCard(element, removeCard, onLikeButtonHandler, onCardImageHandler));
});

editButton.addEventListener('click', openPopupTypeEditProfileData);
addButton.addEventListener('click', openPopupTypeNewCard);

popupTypeEditProfileData.addEventListener('submit', submitProfileData);
popupTypeNewCard.addEventListener('submit', submitNewCard);
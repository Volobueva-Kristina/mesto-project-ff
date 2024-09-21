import {
  placesContainer,
  popupTypeImage
} from '../index.js';
import { openPopup } from './modal.js';

const cardsTemplate = document.querySelector('#card-template');

export function createCard(CardDate, removeCard, onLikeButtonHandler, onCardImageHandler) {
  const cardElement = cardsTemplate.content
    .querySelector('.card')
    .cloneNode(true);

  const cardElementTitle = cardElement.querySelector('.card__title');
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementDelButton = cardElement.querySelector('.card__delete-button');
  const cardElementLikeButton = cardElement.querySelector('.card__like-button');

  cardElementTitle.textContent = CardDate.name;
  cardElementImage.src = CardDate.link;
  cardElementImage.alt = CardDate.name;

  cardElementDelButton.addEventListener('click', removeCard);
  cardElementLikeButton.addEventListener('click', onLikeButtonHandler);
  cardElementImage.addEventListener('click', ()=> onCardImageHandler(CardDate.link, CardDate.name));

  return cardElement;
}

export function removeCard(evt) {
  const card = evt.target.closest('.card');

  card.remove();
}

export function renderCard(cardElement) {
  placesContainer.append(cardElement);
}

export function onCardImageHandler(link, name) {
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');

  popupImage.src = link;
  popupCaption.textContent = name;

  openPopup(popupTypeImage);
}

export function onLikeButtonHandler(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
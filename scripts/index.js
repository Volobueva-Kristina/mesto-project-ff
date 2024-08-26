// @todo: Темплейт карточки
const cardsTemp = document.querySelector('#card-template');

// @todo: DOM узлы
const placesContainer = document.querySelector('.places__list');
const profile = document.querySelector('.profile');
const addButton = profile.querySelector('.profile__add-button');
const resetButton = document.querySelector('.card__delete-button');

// @todo: Функция создания карточки
function addCards(placeValue, pictureValue) {
    const cardsTemplate = cardsTemp.content;
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
  
    cardElement.querySelector('.card__image').src = pictureValue;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        const eventTarget = evt.target.closest('.card');
        removeCard(eventTarget);
    });
    cardElement.querySelector('.card__title').textContent = placeValue;
    cardElement.querySelector('.card__like-button').addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__like-button_is-active");
    });
    placesContainer.append(cardElement);
  };


// @todo: Функция удаления карточки
function removeCard(removeCardItem) {
    removeCardItem.remove();
  }

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    addCards(element.name, element.link);
});

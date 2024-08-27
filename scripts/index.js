// @todo: Темплейт карточки
const cardsTemplate = document.querySelector("#card-template");

// @todo: DOM узлы
const placesContainer = document.querySelector(".places__list");
const profile = document.querySelector(".profile");
const addButton = profile.querySelector(".profile__add-button");

// @todo: Функция создания карточки
function createCard(CardDate, removeCard) {
  const cardElement = cardsTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementDelButton = cardElement.querySelector(
    ".card__delete-button"
  );

  cardElementTitle.textContent = CardDate.name;
  cardElementImage.src = CardDate.link;
  cardElementImage.alt = CardDate.name;

  cardElementDelButton.addEventListener("click", removeCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

function renderCard(cardElement) {
  placesContainer.append(cardElement);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  renderCard(createCard(element, removeCard));
});

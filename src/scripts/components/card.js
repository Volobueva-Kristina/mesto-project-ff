const cardsTemplate = document.querySelector('#card-template');

export function createCard(CardDate, userId, removeCard, likeHandler, onCardImageHandler) {
  const cardElement = cardsTemplate.content
    .querySelector('.card')
    .cloneNode(true);

  const cardElementTitle = cardElement.querySelector('.card__title');
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementDelButton = cardElement.querySelector('.card__delete-button');
  const cardElementLikeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-counts');

  cardElementTitle.textContent = CardDate.name;
  cardElementImage.src = CardDate.link;
  cardElementImage.alt = CardDate.name;
  likeCount.textContent = CardDate.likes.length;

  if(CardDate.owner._id !== userId) {
    cardElementDelButton.setAttribute('style', `display: none;`);
  } else {
    cardElementDelButton.addEventListener('click', () => {
      removeCard(cardElement, CardDate._id);
    });
  }

  if(isliked(userId, CardDate.likes)){
    onLikeButtonHandler(cardElementLikeButton, likeCount, CardDate.likes.length);
  } else {
    likeCount.textContent = CardDate.likes.length;
  }

  cardElementLikeButton.addEventListener('click', (evt)=> likeHandler(evt.target, likeCount, CardDate._id));
  cardElementImage.addEventListener('click', ()=> onCardImageHandler(CardDate.link, CardDate.name));

  return cardElement;
}

function isliked (userId, arrayOfUserLikes){
  return arrayOfUserLikes.some(item => {
    return item._id === userId
  });
}

export function removeCard(evt) {
  const card = evt.target.closest('.card');

  card.remove();
}

export function onLikeButtonHandler(likeButton, likeCountElement, likeCount) {
  likeButton.classList.toggle('card__like-button_is-active');
  likeCountElement.textContent = likeCount;
}


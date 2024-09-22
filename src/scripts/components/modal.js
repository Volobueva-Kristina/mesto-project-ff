const POPUP_DELAY_APPEARANCE_TIME = 100;


export function closePopupOnCloseButton(evt) {
  const popup = evt.target.closest('.popup');

  closePopup(popup);
}

function closePopupOnOverlay(evt) {
  const { target } = evt;

  if (!target.classList.contains('popup')) {
    return;
  }

  closePopup(target);
}

function closePopupOnEscape(evt) {
  const popup = document.querySelector('.popup_is-opened');

  if (evt.key !== "Escape") {
    return;
  }

  closePopup(popup);
}

export function openPopup(popup) {
  const closeButton = popup.querySelector('.popup__close');

  popup.classList.add('popup_is-animated');

  setTimeout(() => popup.classList.add('popup_is-opened'), POPUP_DELAY_APPEARANCE_TIME);

  closeButton.addEventListener('click', closePopupOnCloseButton);
  document.addEventListener('click', closePopupOnOverlay);
  document.addEventListener('keydown', closePopupOnEscape);
}

export function closePopup(popup) {
  const closeButton = popup.querySelector('.popup__close');

  popup.classList.remove('popup_is-opened');

  setTimeout(() => popup.classList.remove('popup_is-animated'), POPUP_DELAY_APPEARANCE_TIME);

  closeButton.addEventListener('click', closePopupOnCloseButton);
  document.removeEventListener('click', closePopupOnOverlay);
  document.removeEventListener('keydown', closePopupOnEscape);
}

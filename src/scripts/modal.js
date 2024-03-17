export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escClose);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escClose);
  popup.querySelector('.popup__button').textContent = "Сохранить";
};

function escClose(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  };
};

export function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.currentTarget);
  };
};
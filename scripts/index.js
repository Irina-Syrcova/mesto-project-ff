const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  deleteButton.addEventListener('click', deleteCallback);

  return cardElement;
};

function deleteCard(event) {
  const listItem = event.target.closest('.places__item');
  listItem.remove();
}

initialCards.forEach(function(element) {
  placesList.append(createCard(element, deleteCard));
});
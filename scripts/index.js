// const placesList = document.querySelector('.places__list');
// const cardTemplate = document.querySelector('#card-template').content;

// initialCards.forEach(function(element){
//   const cardElement = cardTemplate.cloneNode(true);
//   cardElement.querySelector('.card__image').src = element.link;
//   cardElement.querySelector('.card__title').textContent = element.name;

//   const deleteButton = cardElement.querySelector('.card__delete-button');
//   deleteButton.addEventListener('click', function () {
//   const listItem = deleteButton.closest('.places__item');
//   listItem.remove();
//   });

//   placesList.append(cardElement);
// });
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
};

function deleteCard(event) {
  const listItem = event.target.closest('.places__item');
  listItem.remove();
}

initialCards.forEach(function(element) {
  placesList.append(createCard(element, deleteCard));
});
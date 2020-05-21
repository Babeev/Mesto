export class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
    this.handlerDelete = this.handlerDelete.bind(this);
    this.handlerOpenPhoto = this.handlerOpenPhoto.bind(this);
  }

  create(popupImg, open) {
    const cardContainer = document.createElement('div');
    const cardImage = document.createElement('div');
    const buttonDelete = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const buttonLike = document.createElement('button');

    cardContainer.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    buttonDelete.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    buttonLike.classList.add('place-card__like-icon');

    cardImage.setAttribute('style', `background-image: url(${this.link})`);
    cardName.textContent = this.name;

    cardContainer.appendChild(cardImage);
    cardImage.appendChild(buttonDelete);
    cardContainer.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(buttonLike);

    this.cardElem = cardContainer;
    this.buttonLike = buttonLike;
    this.buttonDelete = buttonDelete;
    this.cardImage = cardImage;
    this.popupImg = popupImg;
    this.popupOpen = open;

    this.listeners();
    return cardContainer;
  }

  listeners() {
    this.buttonLike
      .addEventListener('click', this.like);
    this.buttonDelete
      .addEventListener('click', this.handlerDelete);

    this.cardImage
      .addEventListener('click', this.handlerOpenPhoto);
  }

  handlerDelete(event) {
    event.preventDefault();

    this.buttonLike
      .removeEventListener('click', this.like);

    this.buttonDelete
      .removeEventListener('click', this.handlerDelete);

    this.cardImage
      .removeEventListener('click', this.handlerOpenPhoto);

    this.remove();
  }

  handlerOpenPhoto() {
    this.popupOpen.openClose();
    this.popupImg.src = this.link;
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove() {
    this.cardElem.remove();
  }
}



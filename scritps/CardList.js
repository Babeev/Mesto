class CardList {
  constructor(container) {
    this.container = container;
  }
  addCard(cardElem) {
    this.container.appendChild(cardElem);
  }
  render(classCreate, popupImg, open) {
    this.addCard(classCreate.create(popupImg, open));
  }
}
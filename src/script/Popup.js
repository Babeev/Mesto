export class Popup {
  constructor(popup) {
    this.popup = popup;
  }

  openClose() {
    this.popup.classList.toggle('popup_is-opened');
  }

}



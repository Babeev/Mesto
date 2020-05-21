class Listen {
  constructor(thisClass) {
    this.thisClass = thisClass;
  }

  openClose(button) {
    button
      .addEventListener('click', () => {
        this.thisClass.openClose();
      });
  }

  popupClear(open, form, trueOrFalse) {
    open
      .addEventListener('click', () => {
        form.reset();
        this.thisClass.setSubmitButtonState(trueOrFalse);
        const errors = form.querySelectorAll(`span`);
        errors.forEach(element => {
          element.textContent = '';
        });
        this.thisClass.setEventListeners();
      });
  }
}
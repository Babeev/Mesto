class FormValidator {
  constructor(form, button) {
    this.form = form;
    this.button = button;
    this.inputs = Array.from(this.form.elements).filter(element => element.id !== this.button.id);
  }

  chekvalid(element, error) {
    // Можно лучше
    // Смысл объекта с ошибками в том, что его передают в класс а не зашивают туда
    // тогда в класс можно передать объект с другой локализацией, например,
    // не меняя класса
    const words = { validationEmpty: 'Это обязательное поле', validationUrl: 'Должна быть ссылка', validationLenght: 'Должно быть от 2 до 30 символов' };
    if (element.value.length === 0) {
      error.textContent = words.validationEmpty;
      return false;
    }
    if (element.validity.typeMismatch) {
      error.textContent = words.validationUrl;
      return false;
    }
    if (element.validity.tooShort) {
      error.textContent = words.validationLenght;
      return false;
    }

    error.textContent = '';
    return true;
  }

  checkInputValidity() {
    let isValid = true;
    this.inputs.forEach(element => {
      let error = this.form.querySelector(`#error-${element.id}`);
      if (!this.chekvalid(element, error)) {
        isValid = false;
      }
    })
    this.setSubmitButtonState(isValid);
  }

  setSubmitButtonState(isValidForm) {
    if (isValidForm) {
      this.button.removeAttribute('disabled');
      this.button.classList.add('button__active');
      return;
    }
    if (!isValidForm) {
      this.button.setAttribute('disabled', true);
      this.button.classList.remove('button__active');
      return;
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', () => this.checkInputValidity());
  }
}

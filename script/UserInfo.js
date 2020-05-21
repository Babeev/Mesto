class UserInfo {
  constructor(updateName, updateAbout, inputName, inputAbout) {
    this.updateName = updateName;
    this.updateAbout = updateAbout;
    this.inputName = inputName;
    this.inputAbout = inputAbout;
  }

  updateUserInfo(newname, newabout) {
    this.updateName.textContent = newname;
    this.updateAbout.textContent = newabout;
    this.inputName.setAttribute('value', newname);
    this.inputAbout.setAttribute('value', newabout);
  }

  setAva(avatar, link) {
    avatar.setAttribute('style', `background-image: url(${link})`);
  }
}
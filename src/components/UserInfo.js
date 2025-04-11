export default class UserInfo {
  constructor({ titleSelector, subtitleSelector, avatarSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._subtitleElement = document.querySelector(subtitleSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      title: this._titleElement.textContent,
      subtitle: this._subtitleElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ title, subtitle, avatar }) {
    this._titleElement.textContent = title;
    this._subtitleElement.textContent = subtitle;
    this._avatarElement.src = avatar;
  }
}

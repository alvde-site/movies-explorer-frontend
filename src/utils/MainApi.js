class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  test() {
    console.log(process.env);
  }
  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  //   getUserInfo() {
  //     return fetch(`${this._baseUrl}/users/me`, {
  //       headers: this._headers,
  //       credentials: 'include',
  //     }).then(this._checkResponse);
  //   }

  //   editUserInfo({ name, about }) {
  //     return fetch(`${this._baseUrl}/users/me`, {
  //       method: "PATCH",
  //       headers: this._headers,
  //       body: JSON.stringify({
  //         name: name,
  //         about: about,
  //       }),
  //       credentials: 'include',
  //     }).then(this._checkResponse);
  //   }

  createMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  }) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(movieId) {
      return fetch(`${this._baseUrl}/cards/${movieId}`, {
        method: "DELETE",
        headers: this._headers,
        credentials: 'include',
      }).then(this._checkResponse);
    }

  //   addLike(cardId) {
  //     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //       method: "PUT",
  //       headers: this._headers,
  //       credentials: 'include',
  //     }).then(this._checkResponse);
  //   }

  //   removeLike(cardId) {
  //     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //       method: "DELETE",
  //       headers: this._headers,
  //       credentials: 'include',
  //     }).then(this._checkResponse);
  //   }

  //   changeLikeCardStatus(cardId, notLiked) {
  //     if (notLiked) {
  //       return this.addLike(cardId);
  //     } else {
  //       return this.removeLike(cardId);
  //     }
  //   }

  //   editAvatarInfo({ avatar }) {
  //     return fetch(`${this._baseUrl}/users/me/avatar`, {
  //       method: "PATCH",
  //       headers: this._headers,
  //       credentials: 'include',
  //       body: JSON.stringify({
  //         avatar: avatar,
  //       }),
  //     }).then(this._checkResponse);
  //   }

    _checkResponse(res) {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    }
}

export const MainApiSet = new MainApi({
  baseUrl: `${window.location.protocol}${
    process.env.REACT_APP_API_URL || "//localhost:3001"
  }`,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

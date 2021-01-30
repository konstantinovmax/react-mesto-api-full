class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка при загрузке данных пользователя с сервера');
        });
    }

    getAllCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка при загрузке карточек с сервера');
        });
    }

    patchEditProfile({ name, description }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: description
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка при редактировании данных пользователя');
        });
    }

    postCard({ name, description }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: description
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка при добавлении карточки');
        });
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка при удалении карточки');
        });
    }

    changeLikeCardStatus(id, isNotLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: isNotLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка при попытке убрать лайк');
        });
    }

    patchChangeAvatar({ avatarName }) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarName
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка при попытке сменить аватар');
        });
    }
}

const api = new Api({
    url: 'http://localhost:3000',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
       'Content-Type': 'application/JSON',
    },
});

export default api;

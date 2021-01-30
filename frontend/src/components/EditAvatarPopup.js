import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarInput = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatarName: avatarInput.current.value
        });
    } 

    return (
        <PopupWithForm
        isOpen={props.isOpen}
        name="add-avatar"
        title="Обновить аватар"
        onClose={props.onClose}
        onSubmit={handleSubmit}
        >
            <input
            ref={avatarInput}
            id="editavatar-input"
            name="avatarName"
            type="url"
            className="modal__input modal__input_type_url"
            placeholder="Ссылка на картинку"
            required
            />
            <span id="avatar-input-error" className="modal__input-error" />
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [placeName, setPlaceName] = React.useState('');
    const [placeUrl, setPlaceUrl] = React.useState('');

    function handlePlaceNameChange(e) { 
        setPlaceName(e.target.value) 
    }

    function handlePlaceUrlChange(e) { 
        setPlaceUrl(e.target.value) 
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: placeName,
            description: placeUrl
        })
        setPlaceName('');
        setPlaceUrl('');
    } 

    return (
        <PopupWithForm isOpen={props.isOpen} name="add-element" title="Новое место" onClose={props.onClose} onSubmit={handleSubmit}>
            <input
            id="addplace-name-input"
            name="name"
            type="text"
            className="modal__input modal__input_type_place"
            value={placeName}
            onChange={handlePlaceNameChange}
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            />
            <span id="name-input-error" className="modal__input-error" />
            <input
            id="addplace-description-input"
            name="description"
            type="url"
            className="modal__input modal__input_type_url"
            value={placeUrl}
            onChange={handlePlaceUrlChange}
            placeholder="Ссылка на картинку"
            required
            />
            <span id="description-input-error" className="modal__input-error" />
        </PopupWithForm>
    );
}

export default AddPlacePopup;
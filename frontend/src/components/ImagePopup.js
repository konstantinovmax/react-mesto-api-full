import React from 'react';

function ImagePopup(props) {
    return (
        <>
            <div className={`modal modal_type_picture ${props.card.link && 'modal_is-open'}`}>
                <div className="modal__container_type-picture">
                    <button type="reset" className="modal__close-button modal__close-button_type-picture" onClick={props.onClose} />
                    <figure>
                        <img className="modal__image" src={props.card.link} alt={props.card.name} />
                        <figcaption className="modal__caption">{props.card.name}</figcaption>
                    </figure>
                </div>
            </div>
        </>
    );
}

export default ImagePopup;
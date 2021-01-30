import React from 'react';

function PopupWithForm(props) {  
    return (
        <>
            <div className={`modal modal_type_${props.name} ${props.isOpen && 'modal_is-open'}`}>
                <form name="" action="#" className={`modal__container modal__container_type_${props.name}`} onSubmit={props.onSubmit} noValidate>
                    <h2 className="modal__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="modal__save-button">{props.buttonText || 'Сохранить'}</button>
                    <button type="reset" className="modal__close-button" onClick={props.onClose}></button>
                </form>
            </div>
        </>
    );
}

export default PopupWithForm;
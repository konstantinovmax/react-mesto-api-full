import React from 'react';
import successfulAccess from '../images/done.svg';
import failureAccess from '../images/denied.svg';

function InfoTooltip(props) {

    const noticeText = {
        success: 'Вы успешно зарегистрировались!',
        fail: 'Что-то пошло не так! Попробуйте ещё раз.'
    }

    const noticeImageAlt = {
        success: 'Успешно',
        fail: 'Ошибка'
    }

    return (
        <div className={`modal modal_type_signup-info ${ props.isOpen && 'modal_is-open' }`}>
            <div className="modal__container modal__container_type_signup-info">
                <button
                type="reset"
                className="modal__close-button modal__close-button_type-signup-info"
                onClick={props.onClose}
                />
                <img
                className="modal__access-status"
                src={props.accessNotice ? successfulAccess : failureAccess}
                alt={props.accessNotice ? noticeImageAlt.success : noticeImageAlt.fail}
                />
                <h2 className="modal__title">{props.accessNotice ? noticeText.success : noticeText.fail}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;

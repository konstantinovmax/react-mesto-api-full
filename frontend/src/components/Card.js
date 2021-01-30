import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : 'element__like-button'}`
    );

    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? 'element__delete_active' : 'element__delete'}`
    );
    
    
    function handleClick() {
        props.onCardClick(props.card);
    } 

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <>
            <figure className="element">
                <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
                <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
                <div className="element__caption-container">
                    <h2 className="element__caption">{props.card.name}</h2>
                    <div className="element__like-area">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                        <output className="element__like-numbers">{props.card.likes.length}</output>
                    </div>
                </div>
            </figure>
        </>
    );
}

export default Card;
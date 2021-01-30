import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth';

function App() {
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [accessNotice, setAccessNotice] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState('');
  const history = useHistory();


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoToolTip() {
    setIsInfoToolTipOpen(true);
  }

  function handleMobileMenuOpen() {
    setIsMobileMenuOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setIsMobileMenuOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(newUserInfo) {
    api.patchEditProfile(newUserInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarName) {
    api.patchChangeAvatar(avatarName)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.postCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
          console.log(err);
      });
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    api.deleteCard(card._id, isOwn)
      .then(() => {
          const newCards = cards.filter((c) => card._id !== c._id);
          setCards(newCards);
      })
      .catch((err) => {
          console.log(err);
      });
  }

  function handleRegistration(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res.data) {
          setAccessNotice(true);
          handleInfoToolTip();
          history.push('./sign-in');
        } else {
          setAccessNotice(false);
          handleInfoToolTip();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setUserEmail(userEmail);
          setLoggedIn(true);
          history.push('/');
        } else {
          setAccessNotice(false);
          handleInfoToolTip();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            const userEmail = {
              email: res.email
            }
            setUserEmail(userEmail);
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        return;
      }
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }


  React.useEffect(() => {
    tokenCheck(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


   return (
    <>
      <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
          <div className="root__content">
            <Header
            userEmail={userEmail}
            onSignOut={handleLogout}
            onOpenMobileMenu={handleMobileMenuOpen}
            isOpen={isMobileMenuOpen}
            onClose={closeAllPopups}
            />
            <Switch>
              <ProtectedRoute
                exact path='/'
                loggedIn={loggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
              <Route path='/sign-up'>
                <Register
                onRegister={handleRegistration}
                />
              </Route>
              <Route path='/sign-in'>
                <Login
                onLogin={handleLogin}
                />
              </Route>
              <Route path="*">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
            <Footer />
            <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit}
            />
            <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            />
            <InfoTooltip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            accessNotice={accessNotice}
            />
          </div>
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;

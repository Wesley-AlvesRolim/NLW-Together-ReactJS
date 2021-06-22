import { useState } from 'react';
import { createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { authFirebase, firebase } from './services/firebase';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import './styles/global.scss';

type AuthContextType = {
  User: User | undefined;
  signInWithGoogle: () => void;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [User, SetUser] = useState<User>();

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    authFirebase.signInWithPopup(provider).then(result => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        SetUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ User, signInWithGoogle }}>
        <Route path='/' exact={true} component={Home} />
        <Route path='/rooms/new' component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
export default App;

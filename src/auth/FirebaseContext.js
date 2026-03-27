import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
import {
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup
} from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';

// config
import firebaseApp from '../firebase';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {

  switch (action.type) {
    case 'INITIAL':
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case 'UPDATE_BANKROLL':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          bankroll: action.payload.bankrollValue,
          stakingStrategy: action.payload.stakingStrg
        },
      };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

const GOOGLE_PROVIDER = new GoogleAuthProvider();

const GITHUB_PROVIDER = new GithubAuthProvider();

const TWITTER_PROVIDER = new TwitterAuthProvider();

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          const userRef = doc(DB, 'users', user.uid);

          const docSnap = await getDoc(userRef);

          const profile = docSnap.data();

          dispatch({
            type: 'INITIAL',
            payload: {
              isAuthenticated: true,
              user: {
                ...user,
                ...profile,
              },
            },
          });
        } else {
          dispatch({
            type: 'INITIAL',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    await signInWithEmailAndPassword(AUTH, email, password);
  }, []);

  const loginWithGoogle = useCallback(() => {
    signInWithPopup(AUTH, GOOGLE_PROVIDER);
  }, []);

  const loginWithGithub = useCallback(() => {
    signInWithPopup(AUTH, GITHUB_PROVIDER);
  }, []);

  const loginWithTwitter = useCallback(() => {
    signInWithPopup(AUTH, TWITTER_PROVIDER);
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, userName) => {
    await createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
      const userRef = doc(collection(DB, 'users'), res.user?.uid);

      await setDoc(userRef, {
        uid: res.user?.uid,
        email,
        username: userName,
        membership: '1',
        bankroll: 0,
        role: 'subscriber'
      });
    });
  }, []);

  // Reset Password
  const resetPassword = useCallback(async (email) => {
    console.log("Before");
    await sendPasswordResetEmail(AUTH, email);
    console.log("Password reset email sent successfully!");
  }, []);

  // Delete account
  const deleteAccount = useCallback(async () => {
    const user = AUTH.currentUser;
    try {

      if (!user) {
        throw new Error('No authenticated user');
      }

      await deleteDoc(doc(DB, 'users', user.uid));
      await deleteUser(user);

      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });

    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        const providerId = user.providerData[0]?.providerId;

        let provider = null;

        if (providerId === 'google.com') provider = GOOGLE_PROVIDER;
        if (providerId === 'github.com') provider = GITHUB_PROVIDER;
        if (providerId === 'twitter.com') provider = TWITTER_PROVIDER;

        if (!provider) {
          throw new Error('Re-authentication required');
        }

        await reauthenticateWithPopup(user, provider);

        await deleteDoc(doc(DB, 'users', user.uid));
        await deleteUser(user);
      } else {
        throw error;
      }
    }
  }, []);

  const updateBankroll = useCallback(async (bankrollValue, stakingStrg, uid) => {
    const userRef = doc(collection(DB, 'users'), uid);

    await updateDoc(userRef, {
      bankroll: String(bankrollValue),
      stakingStrategy: stakingStrg
    });

    dispatch({
      type: 'UPDATE_BANKROLL',
      payload: {
        bankrollValue,
        stakingStrg
      },
    });
  }, []);

  const addEmailSubscribe = useCallback(async (email) => {
    try {
      // Add new document to website_subscribers collection
      const docRef = await addDoc(collection(DB, 'website_subscribers'), {
        email,
        createdAt: serverTimestamp(),
      });

      console.log('Subscriber added with ID:', docRef.id);
      
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding subscriber:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    signOut(AUTH);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'firebase',
      login,
      loginWithGoogle,
      loginWithGithub,
      loginWithTwitter,
      register,
      resetPassword,
      updateBankroll,
      logout,
      deleteAccount,
      addEmailSubscribe
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      loginWithGithub,
      loginWithGoogle,
      loginWithTwitter,
      register,
      resetPassword,
      updateBankroll,
      logout,
      deleteAccount,
      addEmailSubscribe
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

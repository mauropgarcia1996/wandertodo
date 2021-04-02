import React, { useContext, useEffect } from "react";
import firebase from "firebase/app";
import AuthContext from "../context/authContext/AuthContext";

const LoginButton: React.FC = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log(authContext.user);
  }, [authContext]);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // Handle user, token, data, etc...
        const credential = result.credential as firebase.auth.OAuthCredential;
        const newUser = {
          displayName: result.user?.displayName,
          email: result.user?.email,
          photoURL: result.user?.photoURL,
          accessToken: credential.accessToken,
          idToken: credential.idToken,
          refreshToken: result.user?.refreshToken,
          uui: result.user?.uid,
        };

        authContext.updateUser(newUser);
      })
      .catch((error) => {
        // Handle error...
        console.log(error)
      });
  };

  return (
    <button
      className="flex items-center px-2 py-1 transform ease-in-out duration-500 border-gray-300 border rounded-lg hover:bg-red-600 hover:text-gray-50 font-semibold"
      onClick={login}
    >
      <p className="mr-2">Sign in with Google</p>
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
    </button>
  );
};

export default LoginButton;

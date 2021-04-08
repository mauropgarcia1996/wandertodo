import React, { useContext, useState } from "react";
import firebase from "firebase";
import AuthContext from "../context/authContext/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const register = (e: any) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        
        // Signed in
        // var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log(error);

        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ..
      });
  };

  const login = (e: any) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // Signed in
        console.log(result);
        const credential = result.credential as firebase.auth.OAuthCredential;
        const newUser = {
          displayName: result.user?.displayName,
          email: result.user?.email,
          photoURL: result.user?.photoURL,
          accessToken: credential?.accessToken,
          idToken: credential?.idToken,
          refreshToken: result.user?.refreshToken,
          uuid: result.user?.uid,
        };
        authContext.updateUser(newUser);
        //   var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log(error);

        //   var errorCode = error.code;
        //   var errorMessage = error.message;
      });
  };
  return (
    <div>
      <form className="text-gray-900">
        <input
          id="form-email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="form-password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="text-green-100" onClick={register}>
          Register
        </button>
        <button className="text-green-100" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

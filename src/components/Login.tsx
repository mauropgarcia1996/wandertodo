import React, { useContext, useState } from "react";
import firebase from "firebase";
import AuthContext from "../context/authContext/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = () => {
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
    <div className="w-full flex justify-center">
      <form
        className="text-gray-900 flex flex-col w-full px-4 md:px-2"
        style={{ maxWidth: "500px" }}
      >
        <div className="flex flex-col">
          <label className="text-gray-100 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="px-1 py-2 rounded-md my-2 bg-gray-100 text-gray-900 focus:outline-none"
            id="form-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="text-gray-400 font-bold text-sm">
            Check your credentials.
          </span>
        </div>

        <div className="flex flex-col my-2">
          <label className="text-gray-100 font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="px-1 py-2 rounded-md my-2 bg-gray-100 text-gray-900 focus:outline-none"
            id="form-password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-gray-400 font-bold text-sm">
            Please include one uppercase letter.
          </span>
        </div>
        <button
          className="text-gray-100 font-bold bg-gray-600 hover:bg-gray-700 w-full py-2 rounded-md mt-6 transform duration-200 ease-in-out hover:scale-105"
          onClick={register}
        >
          Register
        </button>
        <button
          className="text-gray-100 font-bold bg-blue-400 hover:bg-blue-500 w-full py-2 rounded-md mt-4 mb-2 transform duration-200 ease-in-out hover:scale-105"
          onClick={login}
        >
          Login
        </button>
        <div className="w-full flex flex-row-reverse">
          <span className="text-gray-400 text-xs">
            You can also <span className="text-semibold">login</span> with
            Google!
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;

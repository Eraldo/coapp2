import {AuthMethods, AuthProviders} from "angularfire2";

export const firebaseConfig = {
  apiKey: "AIzaSyCBx-Eqm_3lRIJ3AC0boOM839Ub8Cp11EM",
  authDomain: "angular-firebase-university.firebaseapp.com",
  databaseURL: "https://angular-firebase-university.firebaseio.com",
  projectId: "angular-firebase-university",
  storageBucket: "angular-firebase-university.appspot.com",
  messagingSenderId: "652179599808"
};

export const authConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

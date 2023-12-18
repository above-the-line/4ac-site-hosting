import react from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkIQBo2136W8ByNEY531_oOMH7jPfPP4c",
  authDomain: "form--submissions.firebaseapp.com",
  projectId: "form--submissions",
  storageBucket: "form--submissions.appspot.com",
  messagingSenderId: "210917956534",
  appId: "1:210917956534:web:4a02b665815630e2bf7f17",
  measurementId: "G-CMR1EGT01W",
};

// Initialize Firebase and other libraries
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const id = String(process.env.REACT_APP_RECAPTCHA_ID);
console.log(id);

// Create a ReCaptchaEnterpriseProvider instance using your reCAPTCHA Enterprise
// site key and pass it to initializeAppCheck().
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(id),
  isTokenAutoRefreshEnabled: true, // Set to true to allow auto-refresh.
});

const ReCaptcha: React.FC = () => {
  return (
    <>
      <div
        className="g-recaptcha"
        data-sitekey={id}
        data-callback="dataCallback"
        data-expired-callback="dataExpiredCallback"
      />
    </>
  );
};

export default ReCaptcha;

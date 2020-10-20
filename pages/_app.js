import { Fuego, FuegoProvider } from "@nandorojo/swr-firestore";
import "firebase/firestore";
import "react-circular-progressbar/dist/styles.css";
import firebaseConfig from "../firebase-config";
import "../styles/globals.css";
import "../styles/tailwind.css";

// Fuego is some weird codename for the firestore package we're using
const fuego = new Fuego(firebaseConfig);

require("typeface-luckiest-guy");
require("typeface-quicksand");

function MyApp({ Component, pageProps }) {
  return (
    <FuegoProvider fuego={fuego}>
      <Component {...pageProps} />
    </FuegoProvider>
  );
}

export default MyApp;

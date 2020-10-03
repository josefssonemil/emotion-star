import "../styles/globals.css";
import "../styles/tailwind.css";

import "react-circular-progressbar/dist/styles.css";

require("typeface-luckiest-guy");

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

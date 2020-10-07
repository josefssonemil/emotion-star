const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      height: (theme) => ({
        "screen-2/3": "66vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
        100: "25rem",
        warmupCam: "25vh",
      }),
      height: (theme) => ({
        "screen-2/3": "66vw",
        "screen/2": "50vw",
        "screen/3": "calc(100vw / 3)",
        "screen/4": "calc(100vw / 4)",
        "screen/5": "calc(100vw / 5)",
        100: "25rem",
        88: "22rem",
      }),
      colors: {
        local: {
          purple1: "#460270",
          purple2: "#5100C6,",
        },
        player1: "#5EFFF5",
      },
      fontFamily: {
        luckiest: ["Luckiest Guy", "sans-serif"],
      },
      boxShadow: {
        pinkBlur: "0 0 34px 0px rgba(255, 0, 255, 1)",
        pinkBlur2:
          "0 0 17px 0px rgba(255, 0, 255, 1), inset 0 0 17px 0px rgba(255, 0, 255, 1)",
        innerPinkBlur: " inset 0 0 34px 0px rgba(255, 0, 255, 1)",
      },
    },
  },
};

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
    ],

    options: {
      whitelist: [
        "row-start-1",
        "row-start-2",
        "row-start-3",
        "row-start-4",
        "row-start-5",
      ],
    },
  },
  theme: {
    extend: {
      height: {
        "screen-2/3": "66vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
        100: "25rem",
        warmupCam: "25vh",
      },
      height: {
        "screen-2/3": "66vw",
        "screen/2": "50vw",
        "screen/3": "calc(100vw / 3)",
        "screen/4": "calc(100vw / 4)",
        "screen/5": "calc(100vw / 5)",
        100: "25rem",
        88: "22rem",
      },
      colors: {
        local: {
          purple1: "#460270",
          purple2: "#5100C6,",
        },
        player1: "#5EFFF5",
        player2: "#86E409",
      },
      fontFamily: {
        luckiest: ["Luckiest Guy", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      boxShadow: {
        pinkBlur: "0 0 34px 0px rgba(255, 0, 255, 1)",
        pinkBlur2:
          "0 0 17px 0px rgba(255, 0, 255, 1), inset 0 0 17px 0px rgba(255, 0, 255, 1)",
        innerPinkBlur: " inset 0 0 34px 0px rgba(255, 0, 255, 1)",
        greenBlur: "0 0 17px 0px #86E409, inset 0 0 17px 0px #86E409",
        blueBlur: "0 0 17px 0px #4BFAF0, inset 0 0 17px 0px #4BFAF0",
      },
    },
  },
};

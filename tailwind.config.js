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
      },
    },
    linearBorderGradients: {
      directions: {
        // defaults to these values
        t: "to top",
        tr: "to top right",
        r: "to right",
        br: "to bottom right",
        b: "to bottom",
        bl: "to bottom left",
        l: "to left",
        tl: "to top left",
      },
      colors: {
        // defaults to {}
        purple: "#460270",
        purpleStroke: ["#460270", "#5100C6"],
        "red-green-blue": ["#f00", "#0f0", "#00f"],
        "black-white-with-stops": ["#000", "#000 45%", "#fff 55%", "#fff"],
      },
    },
    repeatingLinearBorderGradients: (theme) => ({
      directions: theme("linearBorderGradients.directions"), // defaults to the same values as linearBorderGradients’ directions
      colors: theme("linearBorderGradients.colors"), // defaults to {}
      lengths: {
        // defaults to {}
        sm: "25px",
        md: "50px",
        lg: "100px",
      },
    }),
  },
  variants: {
    linearBorderGradients: ["responsive"], // defaults to ['responsive']
    repeatingLinearBorderGradients: ["responsive"], // defaults to ['responsive']
  },
  plugins: [require("tailwindcss-border-gradients")()],
};

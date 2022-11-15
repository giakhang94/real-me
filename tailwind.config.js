module.exports = {
  content: [
    "./src/pages/**/*.{html,jsx,js}",
    "./src/components/**/*.{html,jsx,js}",
  ],
  extend: {
    translate: {
      "50%": "-50%",
    },
  },
  theme: {
    screens: {
      smallmobile: "100px",
      // => @media (min-width: 400px) { ... }

      mobile: "400px",
      // => @media (min-width: 400px) { ... }

      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  // ...
};

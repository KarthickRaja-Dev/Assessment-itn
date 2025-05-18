// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'custom-card': '0px 0px 14px 0px #D3D3D326',
      },
    },
  },
};

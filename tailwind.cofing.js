/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.pug", // Para que lea tus archivos de vistas
    "./public/**/*.js"  // Por si tienes JS en public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */

export default {
  
  // Los archivos que pueden utilizar tailwind
  content: ["./src/**/*.{ts,tsx}"],
 
  theme: {
    extend: {
       // Agregar fuentes
      fontFamily:{
      pixel:["Pixelify Sans", "sans-serif"],
      },

      //Pantallas
      screens:{
        'xs': '320px',
      },

    },

    

   
  },
  plugins: [],
}


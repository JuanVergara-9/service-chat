const postcssPresetEnv = require('postcss-preset-env');

/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
    // Opcional, útil para compatibilidad con navegadores más antiguos:
    // 'postcss-preset-env': { stage: 1 },
  },
};

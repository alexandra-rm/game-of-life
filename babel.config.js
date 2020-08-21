module.exports = {
  presets: [
    ["@babel/preset-env", { targets: "defaults" }],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
    ,
    "babel-plugin-emotion",
  ],
  env: {
    production: {
      plugins: ["emotion"],
    },
    development: {
      plugins: [["emotion", { sourceMap: true }]],
    },
  },
};

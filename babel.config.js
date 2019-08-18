module.exports = {
  presets: [
    "@babel/env",
    ["@babel/typescript", {
      isTSX: true,
      allExtensions: true,
    }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
  ]
}
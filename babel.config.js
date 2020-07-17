const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      debug: false,
      corejs: 3,
      targets: "defaults",
    },
  ],
];

module.exports = { presets };

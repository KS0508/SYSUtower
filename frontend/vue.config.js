module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with
        // default configuration and passed to electron-builder
        productName: 'SYSUTower',
        win: {
          target: 'portable',
        },
      },
    },
  },
};

const traverse = require('traverse');

module.exports = function (options) {
  this.extendBuild(function setup(config) {
    traverse(config).forEach(function (some) {
      if (this.key === 'loader' && typeof some === 'string' && some.includes('sass-loader')) {

        let loaderConfig = this.parent.node;
        loaderConfig = { ...loaderConfig, options: { ...loaderConfig.options, sourceMap: true } };

        this.parent.update(loaderConfig);

        const array = [...this.parent.parent.node];

        array.splice(this.parent.path.pop(), 0, {
          loader: 'resolve-url-loader',
          options
        });

        this.parent.parent.update(array);
      }
    });
  });
};

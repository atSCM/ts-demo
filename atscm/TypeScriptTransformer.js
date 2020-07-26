const { extname } = require('path');
const { PartialTransformer } = require('atscm');
const { transform } = require('@babel/core');

module.exports = class TypeScriptTransformer extends PartialTransformer {
  shouldBeTransformed(file) {
    return extname(file.fileName) === '.ts';
  }

  async transformFromFilesystem(node) {
    if (!this.shouldBeTransformed(node)) return;

    const { code } = transform(node.stringValue, {
      filename: node.fileName, // I acutally need to specify a name when using transform
      presets: ['@babel/preset-typescript'],
    });

    node.setRawValue(Buffer.from(code));
  }
};

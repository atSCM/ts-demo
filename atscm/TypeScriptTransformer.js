const { Buffer } = require('buffer');
const { PartialTransformer } = require('atscm');
const { transform } = require('@babel/core');

module.exports = class TypeScriptTransformer extends PartialTransformer {
  static shouldBeTransformed(file) {
    return file.extname === '.ts';
  }

  transformFromFilesystem(node, context) {
    const { code } = transform(node.file.contents, {
      filename: node.file.name, // I acutally need to specify a name when using transform
      presets: ['@babel/preset-typescript'],
    });

    // Create new file with ES5 content
    const result = node.file.clone(); // ?
    result.contents = Buffer.from(code); // Error: cannot read 'contents' of undefined, so I guess node.file.clone() doesn't work

    // We're done, pass the new file to other streams
    context(null, result);
  }
};

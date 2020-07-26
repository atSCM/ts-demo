const { Atviseproject, NodeId, ServerscriptTransformer, DisplayTransformer } = require('atscm');
const TypeScriptTransformer = require('./atscm/TypeScriptTransformer');

const useTypeScriptSources = (TransformerClass) =>
  class extends TransformerClass {
    static get scriptSourceExtension() {
      return '.ts';
    }
  };

/**
 * atscm configuration of atscm-ts-transformer.
 */
class AtscmTsTransformer extends Atviseproject {
  /**
   * The atvise-server's host
   * @type {string}
   */
  static get host() {
    return '10.211.55.11';
  }

  /**
   * The atvise-server ports to use.
   * @type {Object}
   * @property {number} opc The OPC-UA port the atvise-server runs on.
   * @property {number} http The HTTP port the atvise-server can be reached at.
   */
  static get port() {
    return {
      opc: 4891,
      http: 8091,
    };
  }

  static get nodes() {
    return [
      new NodeId('SYSTEM.LIBRARY.PROJECT.OBJECTDISPLAYS'),
      new NodeId('SYSTEM.LIBRARY.PROJECT.SERVERSCRIPTS'),
    ];
  }

  static get nodesToWatch() {
    return [];
  }

  static get useTransformers() {
    const transformersToPatch = [DisplayTransformer, ServerscriptTransformer];

    return (
      super.useTransformers
        // Do not use default display and script transformers
        .filter((t) => !transformersToPatch.find((ban) => t instanceof ban))
        // ... use ts consuming patches instead
        .concat(transformersToPatch.map((T) => new (useTypeScriptSources(T))()))
        // ... and one that does the actual ts compilation
        .concat(new TypeScriptTransformer())
    );
  }
}

module.exports = { default: AtscmTsTransformer };

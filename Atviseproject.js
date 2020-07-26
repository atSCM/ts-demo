const { Atviseproject, NodeId } = require('atscm');
const TypeScriptTransformer = require('./atscm/TypeScriptTransformer');

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

  static get useTransformers() {
    return super.useTransformers.concat(new TypeScriptTransformer());
  }
}

module.exports = { default: AtscmTsTransformer };

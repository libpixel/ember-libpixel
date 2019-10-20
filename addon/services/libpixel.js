import Service from '@ember/service';
import { readOnly } from '@ember/object/computed';
import config from 'ember-get-config';
import jsSHA from 'jssha';

export default Service.extend({
  host: readOnly('config.host'),
  domain: readOnly('config.domain'),
  defaultSource: readOnly('config.defaultSource'),
  secret: readOnly('config.secret'),
  https: readOnly('config.https'),

  didConfigure: false,

  init() {
    this._super(...arguments);

    this.configure();
  },

  configure() {
    this.config = config.libpixel;
    this.didConfigure = true;
  },

  baseUrl() {
    if (this.domain) {
      return "://" + this.domain + ".libpx.com";
    } else {
      return "://" + this.host;
    }
  },

  url(path, options) {
    path = path || "/";
    if (!(path.charAt(0) === "/")) {
      path = "/" + path;
    }
    
    options = options || {};

    let escapedOptions = [];

    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        escapedOptions.push(key + "=" + encodeURIComponent(options[key]));
      }
    }

    let qs = escapedOptions.join("&");
    let url = this.https ? "https" : "http";

    url += this.baseUrl();
 
    url += "/";

    if (options.hasOwnProperty('source')) {
      url += options['source'];
    } else if (this.defaultSource) {
      url += this.defaultSource;
    }

    url += path;

    if (qs !== "") {
      url += "?" + qs;
    }

    if (this.secret) {
      return this.sign(url);
    } else {
      return url;
    }
  },

  sign(url) {
    var parts = url.match(/^(.+?\/\/[^\/]+)(\/[^#]*)(#.*)?$/); // eslint-disable-line no-useless-escape
    var sign = parts[2];

    if (sign[sign.length-1] === "?") {
      sign = sign.slice(0, -1);
    }

    var separator = "?";
    if (sign.indexOf("?") > 0) {
      separator = "&";
    }

    var signer = new jsSHA("SHA-1", "TEXT");
    signer.setHMACKey(this.secret, "TEXT");
    signer.update(sign);
    var hmac = signer.getHMAC("HEX");

    url = parts[1] + sign + separator + "signature=" + hmac;

    if (parts[3]) {
      url += parts[3];
    }

    return url;
  }
});
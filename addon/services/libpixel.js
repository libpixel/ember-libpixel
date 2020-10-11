import Service from '@ember/service';
import { readOnly } from '@ember/object/computed';
import config from 'ember-get-config';
import jsSHA from 'jsSHA';

export default Service.extend({
  host: readOnly('config.host'),
  domain: readOnly('config.domain'),
  defaultSource: readOnly('config.defaultSource'),
  secret: null,
  https: false,

  didConfigure: false,

  init() {
    this._super(...arguments);
    this.configure();
  },

  configure() {
    this.set('config', config.libpixel);
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

    let source, https = undefined;

    if (options.hasOwnProperty('source')) {
      source = options['source'];
      delete options['source'];
    }

    if (options.hasOwnProperty('https')) {
      https = options['https'];
      delete options['https'];
    }

    let escapedOptions = [];

    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        escapedOptions.push(key + "=" + encodeURIComponent(options[key]));
      }
    }

    let qs = escapedOptions.join("&");
    let url = '';

    if (https) {
      url += 'https';
    } else {
      url += this.https ? "https" : "http";
    }

    url += this.baseUrl();
 
    url += "/";

    if (source) {
      url += source;
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
    if (this.secret) {
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
    } else {
      return url;
    }
  }
});
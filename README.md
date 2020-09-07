ember-libpixel
==============================================================================

An Ember service for LibPixel image processing infrastructure.

With this add-on, you'll get the Ember service interface for creating and
signing LibPixel image URLs.


Requirements
------------------------------------------------------------------------------

* a [LibPixel](https://libpixel.com) account

If you wish to try out LibPixel, you can get a free 14-day trial at
[LibPixel.com](https://dashboard.libpixel.com/users/sign_up).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

To get started, install the add-on in your Ember app directory.

```bash
ember install ember-libpixel
```

Then, configure the add-on by adding the following configuration to
`config/environment.js`.

```js
// config/deploy.js

module.exports = function(environment) {
  let ENV = {};

  ENV['libpixel']: {
    host: "ember.libpx.com",
    domain: "ember",
    defaultSource: "app-images",
    secret: "<your-libpixel-secret>",
    https: true
  };
}
```

Either host or domain is required. Rest are optional.

* `host`: Your LibPixel image source endpoint
* `domain`: Your LibPixel image source subdomain
* `defaultSource`: Name of the image source you want to use by default
* `secret`: Your LibPixel secret if you wish to use Secure URLs
* `https`: Whether LibPixel URLs are generated with HTTP or HTTPS, defaults to
  `false`


Usage
------------------------------------------------------------------------------

`ember-libpixel` is a building block and a service interface for LibPixel. To
actually start using LibPixel and harness the power of image processing in
your app, you need the following add-on:

* [ember-libpixel-modifier](https://github.com/libpixel/ember-libpixel-modifier)
  LibPixel element modifier for `img` tags in your templates

[LibPixel Documentation](https://docs.libpixel.com/) hosts examples, tutorials and
walkthroughs on how to use the add-on in your Ember apps.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

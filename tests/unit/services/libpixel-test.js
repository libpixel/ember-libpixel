import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | LibPixel', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    assert.ok(service);
  });

  test('URL', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    assert.equal(service.url('/hello.jpg'), 'http://test.libpx.com/ember-libpixel/hello.jpg');
  });

  test('URL with a source', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    assert.equal(service.url('/hello.jpg', { source: 'custom' }), 'http://test.libpx.com/custom/hello.jpg');
  });

  test('URL with query parameters', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    assert.equal(service.url('/hello.jpg?width=200'), 'http://test.libpx.com/ember-libpixel/hello.jpg?width=200');
    assert.equal(service.url('/hello.jpg', { width: 200 }), 'http://test.libpx.com/ember-libpixel/hello.jpg?width=200');
  });

  test('use HTTPS if the https option is set to true', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    service.https = true;
    assert.equal(service.url('/hello.jpg'), 'https://test.libpx.com/ember-libpixel/hello.jpg');
  });

  test('use HTTPS if the https option is set to true', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    assert.equal(service.url('/hello.jpg', { https: true }), 'https://test.libpx.com/ember-libpixel/hello.jpg');
  });

  test('sets the path to "/" if falsey', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    assert.equal(service.url(null), 'http://test.libpx.com/ember-libpixel/');
    assert.equal(service.url('/'), 'http://test.libpx.com/ember-libpixel/');
    assert.equal(service.url('/', { src: "url" }), 'http://test.libpx.com/ember-libpixel/?src=url');
  });

  test('signing an URL', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    service.secret = "LibPixel";
    assert.equal(service.sign('http://test.libpx.com/ember-libpixel/hello.jpg'), 'http://test.libpx.com/ember-libpixel/hello.jpg?signature=ab1172622b08cd4b48e3c7df94647dd8d94eed47');
  });

  test('signing an URL with existing query string', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    service.secret = "LibPixel";
    assert.equal(service.sign('http://test.libpx.com/ember-libpixel/hello.jpg?width=400'), 'http://test.libpx.com/ember-libpixel/hello.jpg?width=400&signature=9ae038cdbe13c06cf62dc072ef7a786ca474a183');
  });

  test('signing an URL with existing query string and a fragment', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    service.secret = "LibPixel";
    assert.equal(service.sign('http://test.libpx.com/ember-libpixel/hello.jpg?width=400#test'), 'http://test.libpx.com/ember-libpixel/hello.jpg?width=400&signature=9ae038cdbe13c06cf62dc072ef7a786ca474a183#test');
  });

  test('signing an URL with a fragment', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    service.secret = "LibPixel";
    assert.equal(service.sign('http://test.libpx.com/ember-libpixel/hello.jpg#test'), 'http://test.libpx.com/ember-libpixel/hello.jpg?signature=ab1172622b08cd4b48e3c7df94647dd8d94eed47#test');
  });

  test('signing an URL with URL in src parameter', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    service.secret = "LibPixel";
    assert.equal(service.sign('http://test.libpx.com/?src=http://test.libpixel.com/images/1.jpg&width=222'), 'http://test.libpx.com/?src=http://test.libpixel.com/images/1.jpg&width=222&signature=b8d87fa2d1943df0ffeee2c825d7d5a225c5360b');
  });

  test('signing an URL with src parameter ending in a forward slash', function(assert) {
    let service = this.owner.lookup('service:libpixel');
    service.secret = "LibPixel";
    assert.equal(service.sign('http://test.libpx.com/?src=http://test.libpixel.com/images/1/'), 'http://test.libpx.com/?src=http://test.libpixel.com/images/1/&signature=5402177b346db0604762187d958f17773bf05a73');
  });

});

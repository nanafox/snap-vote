import "@testing-library/jest-dom";

// Polyfill Web APIs for Jest (for Next.js route handlers)
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init) {
      this.url = input;
      this.method = init?.method || 'GET';
      this.headers = new Headers(init?.headers);
      this.body = init?.body;
      this._bodyUsed = false;
    }
    json() {
      if (this.body) {
        try {
          return Promise.resolve(JSON.parse(this.body));
        } catch (e) {
          return Promise.reject(new Error('Invalid JSON'));
        }
      }
      return Promise.resolve({});
    }
    text() {
      return Promise.resolve(this.body || '');
    }
  };
}

if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body;
      this.status = init?.status || 200;
      this.statusText = init?.statusText || 'OK';
      this.headers = new Headers(init?.headers);
    }
    json() {
      return Promise.resolve(JSON.parse(this.body));
    }
    static json(data, init) {
      const body = JSON.stringify(data);
      const headers = new Headers(init?.headers);
      headers.set('content-type', 'application/json');
      return new Response(body, { ...init, headers });
    }
  };
}

if (typeof global.Headers === 'undefined') {
  global.Headers = class Headers {
    constructor(init) {
      this.headers = {};
      if (init) {
        for (const [key, value] of Object.entries(init)) {
          this.set(key, value);
        }
      }
    }
    append(name, value) {
      this.set(name, value);
    }
    delete(name) {
      delete this.headers[name.toLowerCase()];
    }
    get(name) {
      return this.headers[name.toLowerCase()] || null;
    }
    has(name) {
      return name.toLowerCase() in this.headers;
    }
    set(name, value) {
      this.headers[name.toLowerCase()] = String(value);
    }
    forEach(callback) {
      for (const [key, value] of Object.entries(this.headers)) {
        callback(value, key, this);
      }
    }
  };
}

// Mock fetch API
global.fetch = jest.fn();

// Suppress console errors during tests
// I am commenting this out to see the errors from create-poll-form
// console.error = jest.fn();

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export const fetchJson = async (url) => await (await fetch(url, { credentials: 'include' })).json();

export const post = async (url, object) => await (await fetch(
  url,
  {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(object)
  }
)).json();


export const rest = async (url, method = GET, body) => {
  const init = { method };

  if (method === POST || method === PUT) {
    init.credentials = 'include';
    if (body) {
      init.headers = { 'content-type': 'application/json' };
      init.body = JSON.stringify(body);
    }
  }
  return await (await fetch(url, init)).json();
}

export const triggerKeys = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77];


export const purify = {};
purify.EMPTY_STRING_TO_UNDEFINED = 'EMPTY_STRING_TO_UNDEFINED';
purify.NULL_TO_UNDEFINED = 'NULL_TO_UNDEFINED';
purify.UNDEFINED_TO_NULL = 'UNDEFINED_TO_NULL';
purify.STRING_TO_NUMBER = 'STRING_TO_NUMBER';
purify.formObject = function (object, ...options) {
  for (const p in object) {
    for (const o of options) {
      switch (o) {
        case this.EMPTY_STRING_TO_UNDEFINED:
          if (object[p] === '') {
            object[p] = undefined;
          }
          break;
        case this.NULL_TO_UNDEFINED:
          if (object[p] === null) {
            object[p] = undefined;
          }
          break;
        case this.UNDEFINED_TO_NULL:
          if (object[p] === undefined) {
            object[p] = null;
          }
          break;
        case this.STRING_TO_NUMBER:
          if (parseInt(object[p]).toString() === object[p]) {
            object[p] = parseInt(object[p]);
          }
          break;
      }
    }
  }
};

export const createMap = (object, id = 'id') => {
  const map = {};
  for (const e of object) {
    map[e[id]] = e;
  }
  return map;
};

export const copyToClipboard = (text) => {
  const el = document.createElement('textarea');
  el.value = text;//this._hanmun.symbol;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  toast('Copied to clipboard !');
};

export const whenPropIsReady = (object, prop) => {
  return new Promise((resolve) => {
    let _check;
    (_check = () => {
      if (object[prop] === null || object[prop] === undefined) {
        setTimeout(_check, 100);
      }
      else {
        resolve(object[prop]);
      }
    })();
  })
};
export const whenWindowPropIsReady = (prop) => whenPropIsReady(window, prop);


export const toast = async (msg, type = 0, duration = 3000) => {
  await whenWindowPropIsReady('toaster');
  if (window.toaster) {
    window.toaster.duration = duration;
    switch (type) {
      case 0: /* neutral */
        window.toaster.style.background = '';
        break;
      case 1: /* success */
        window.toaster.style.background = 'var(--google-green-700)';
        break;
      case 2: /* error */
        window.toaster.style.background = 'var(--paper-red-800)';
        break;
    }
    window.toaster.text = msg;
    window.toaster.open();
  }
};

export const getUrlParts = (url) => {
  url = url.replace(/^\/*|\/*$/g, '');
  const parts = decodeURIComponent(url).split('/');
  return {url, parts};
};
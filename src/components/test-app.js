import {html, LitElement} from '@polymer/lit-element';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';

class TestApp extends LitElement {
  _render() {
    return html `
    <style>
      :host {
        background: red;
      }
    </style>
    <h1>Hello world</h1>
    `
  }

  constructor() {
    super();

    setPassiveTouchGestures(true);
  }
}


window.customElements.define('test-app', TestApp);
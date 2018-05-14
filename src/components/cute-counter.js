import { LitElement, html } from "@polymer/lit-element";
import { connect } from 'pwa-helpers';
import { store } from "../store";

class CuteCounter extends connect(store)(LitElement) {
  _render({ count }) {
    return html`
     ${count}
    `;
  }
  static get properties() {
    return {
      count: Number
    }
  }

  _stateChanged(state) {
    this.count = state.app.count;
  }
}

window.customElements.define('cute-counter', CuteCounter);
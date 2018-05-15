import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';
import { SharedStyles } from "./shared-styles";

class MyView1 extends connect(store)(LitElement) {
  _render(props) {
    return html`
     ${SharedStyles}
    <h1>view 1</h1>
    <p>This is the view 1</p>
    `;
  }
  static get properties() {
    return {

    }
  }

  _stateChanged(state) {

  }
}

window.customElements.define('my-view1', MyView1);
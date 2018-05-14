import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';


class MyView1 extends connect(store)(LitElement) {
  _render(props) {
    return html`
    <h1>view 1</h1>
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
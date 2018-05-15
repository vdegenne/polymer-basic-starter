import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';


class MyView2 extends connect(store)(LitElement) {
  _render(props) {
    return html`
    <h1>view 2</h1>
    <h1>view 2</h1>
    <h1>view 2</h1>
    <h1>view 2</h1>
    <h1>view 2</h1>
    <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
        <h1>view 2</h1>
    `;
  }
  static get properties() {
    return {

    }
  }

  _stateChanged(state) {

  }
}

window.customElements.define('my-view2', MyView2);
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';
import { SharedStyles } from './shared-styles';
import {toaster} from './my-app';

class MyView2 extends connect(store)(LitElement) {
  _render(props) {
    return html`
      ${SharedStyles}
      <div class="inner">
        <h1 on-click=${_ => this.toast('asdf')}>view 2</h1>
        <p>This is the view 2</p>
      </div>
    `;
  }
  static get properties() {
    return {

    }
  }
  _stateChanged(state) {

  }

  toast(message) {
    toaster.text = message;
    toaster.open();
  }
}

window.customElements.define('my-view2', MyView2);
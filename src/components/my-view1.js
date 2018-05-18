import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';
import { SharedStyles } from "./shared-styles";
import { navigate } from '../actions/app';


class MyView1 extends connect(store)(LitElement) {
  _render(props) {
    return html`
     ${SharedStyles}
    <style>
      a {
        text-decoration: none;
      }
    
      mwc-button {
        --mdc-theme-primary: var(--google-blue-700);
        --mdc-theme-on-primary: white;
      }
    </style>
    <h1>view 1</h1>
    <p>If you see this view, it means you successfully installed the
      <code>polymer-basic-starter</code> starter.</p>
    <a href="/view2">
      <mwc-button label="Go on view2" raised></mwc-button>
    </a>
    
    <a href="/404">
      <mwc-button label="be 404" raised></mwc-button>
    </a>
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
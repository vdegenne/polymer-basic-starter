import { LitElement, html } from '@polymer/lit-element';
import { SharedStyles } from './shared-styles.js';

class MyView404 extends LitElement {
  _render(props) {
    return html`
      ${SharedStyles}
      <style>
        :host {
          /* min-height: calc(100vh - 50px); */
          background: var(--google-grey-100);
          padding-top: 30px;
          box-sizing: border-box;
          text-align: center;
        }

        div > * {
          text-align: left;
        }
      </style>
      <div class="inner" style="display:inline-block">
        <h2>😱 404,</h2>
        <p>
          <span>The page couldn't be found.</span>
          <br>
          <span>Click <a href="/">here</a> to get back home.</span>
        </p>
      </div>
    `
  }
}

window.customElements.define('my-view404', MyView404);
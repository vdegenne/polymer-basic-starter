import { html } from '@polymer/lit-element';
import { PageViewElement } from "./page-view-element";
import { SharedStyles } from "./shared-styles";

/* elements */
import '@material/mwc-button';

class NotFoundView extends PageViewElement {
  render () {
    return html`
    ${SharedStyles}
    <div class="inner">
      <p><b>404</b> This page was not found</p>
      <mwc-button dense unelevated @click="${() => changeLocation('/home')}">Back home</mwc-button>
    </div>
    `
  }
}

window.customElements.define('not-found-view', NotFoundView);
import { html } from "@polymer/lit-element";

export const SharedStyles = html`
  <style>
    :host > *:first-of-type {
      margin-top: 0;
    }

    .inner {
      max-width: var(--inner-width, 700px);
      margin-left: auto;
      margin-right: auto;
      padding-left: 20px;
      padding-right: 20px;
    }

    paper-dialog > h2:first-of-type {
      margin-top: 16px;
      padding: 0 16px;
    }

    paper-dialog > .buttons {
      padding: 16px 16px 7px;
    }
    paper-dialog > .buttons > mwc-button {
      margin-left: 5px;
    }

    paper-dialog paper-input {
      --paper-input-container: {
        padding-top: 0;
      }
    }

    mwc-button {
      --mdc-theme-primary: var(--app-second-color);
      margin-bottom: 6px;
    }
  </style>
`;
import {html} from '@polymer/lit-element';

export const SharedStyles = html`
<style>
  [show] {
    display: initial;
  }
  [hide] {
    display: none !important;
  }
  [transparent] {
    visibility: hidden;
  }
  [visible] {
    visibility: visible !important;
  }

  mwc-icon {
    cursor: pointer;
    user-select: none;
  }

  mwc-button {
    --mdc-theme-primary: var(--paper-blue-700);
  }

  .middle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .inner {
    max-width: var(--inner-width, 700px);
    margin-left: auto;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;
  }

  [highlight] {
    background: #ffeb3b;
    /* color: #000; */
  }
</style>`;
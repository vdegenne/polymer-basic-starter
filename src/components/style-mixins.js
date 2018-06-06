import '@polymer/polymer/polymer-legacy.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style is="custom-style">
    html {
      --layout-view: {
        min-height: calc(100vh - 50px);
        background: var(--google-grey-100);
        padding-top: 64px;
        box-sizing: border-box;
      }
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
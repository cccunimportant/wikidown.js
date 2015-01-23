# 標題：程式碼排版

```javascript
window.onhashchange = function () {
  filename = window.location.hash.substring(1);
  loadFile(filename);
}

function loadFile(filename) {
  if (filename === null || filename === '')
    return;
  $('#filename').val(filename);
  window.location.hash = '#'+filename;
  DB.load(filename)
  .done(function(md) {
    $('#mdBox').val(md);
    show();
  })
  .fail(function() {
    $('#mdBox').val(mdNewFile);
    show();
  });
}

```
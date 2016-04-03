var ipc = require('electron').ipcRenderer;
var enter = document.getElementById('command');
var term = document.getElementById('term');

enter.addEventListener('keydown', function(e) {
  if (e.which === 13) {
    if (enter.value.length > 0) {
      ipc.send('terminalReturn', enter.value);
      enter.value = '';
    }
  }
});

ipc.on('terminalResponse', function(event, val) {
  var response = document.createElement("div");
  var node = document.createTextNode(val);
  response.appendChild(node);
  term.appendChild(response);
});

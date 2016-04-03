'use strict';

const pty = require('pty.js');
const Convert = require('ansi-to-html');
var strip = require('strip-color');
var convert = new Convert();

var command = $('#command');
var outputs = $('#outputs');

var term = pty.spawn('bash', [], {
  name: 'xterm',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

term.on('data', function(data) {
  var val = convert.toHtml(data);
  // hack: get rid of notifies
  if (val.substring(0, 4) !== "]777") {
    outputs.append('<div>' + val + '</div>');
  }
});

command.on('keydown', function(e) {
  if (e.which === 13) {
    if (command.val().length > 0) {
      term.write(command.val() + '\r');
      command.val('');
    }
  }
});

command.on('keyup', function(e) {
  if (e.which === 13) {
    command.val('');
  }
});

term.write('ls\r');
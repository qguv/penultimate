'use strict';

const spawn = require('child_process').spawn
const Convert = require('ansi-to-html');
var strip = require('strip-color');
var convert = new Convert();

var command = $('#command');
var outputs = $('#outputs');
var returner;

// Set up bash
var bash = spawn('bash', [], {
  env: process.env,
  cwd: process.env.HOME
});

bash.stdout.on('data', function(d) {
  var data = d.toString('ascii');
  console.log(data);
  $(returner).text(data);
});

function createSidebar(cmd, el) {
  var sidebar = {}

  sidebar.cmd = cmd;
  sidebar.el = $(el);

  sidebar.update = function() {
    returner = sidebar.el;
    bash.stdin.write(sidebar.cmd + "\n");
  }

  sidebar.update();
  return sidebar;
}

var ls = createSidebar("ls", "#ls-output")

function writeStdin(cmd) {
  bash.stdin.write(cmd + "\n");

  var args = cmd.split(' ');
  cmd = args.shift();

  var el = $('<div class="output"></div>');
  el.append('<span class="command">' + cmd + '</span>');
  for (var i=0; i < args.length; i++) {
    el.append('<span class="args"> ' + args[i] + '</span>');
  }
  
  $('#outputs').append(el);
}

command.on('keydown', function(e) {
  if (e.which === 13) {
    if (command.val().length > 0) {
      writeStdin(command.val());
      command.val('');
    }
  }
});


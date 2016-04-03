'use strict';

const spawn = require('child_process').spawn
const Convert = require('ansi-to-html');
var strip = require('strip-color');
var convert = new Convert();

var command = $('#prompt');
var outputs = $('#execs');
var returner;

// Set up bash
var bash = spawn('bash', [], {
  env: process.env,
  cwd: process.env.HOME
});

bash.stdout.on('data', function(d) {
  var data = d.toString('ascii');
  returner.text(data);
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

// var ls = createSidebar("ls", "#ls-output")

function writeStdin(cmd) {
  var args = cmd.split(' ');
  var command = args.shift();
  console.log(args);

  var el = $('.exec').clone().first();
  el.find('.command').text(command);
  var args_text = '';
  for (var i=0; i < args.length; i++) {
    args_text += ' ' + args[i];
  }
  el.find('.args').text(args_text);

  returner = el.find("pre");
  returner.text("");
  bash.stdin.write(cmd + "\n");
  $('#execs').append(el);
}

command.on('keydown', function(e) {
  if (e.which === 13) {
    if (command.val().length > 0) {
      writeStdin(command.val());
      command.val('');
    }
  }
});


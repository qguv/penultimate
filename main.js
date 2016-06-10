'use strict';

const spawn = require('child_process').spawn
const strip = require('strip-color');

const Convert = require('ansi-to-html');
var convert = new Convert();

var command = $('#prompt');
var outputs = $('#execs')[0];
var statusblocks = $('#status-blocks');
var returner;

// Set up bash
var bash = spawn('bash', [], {
  env: process.env,
  cwd: process.env.HOME
});

bash.stderr.on('data', function(d) {
  var data = d.toString('ascii');
  returner.text(data);
  outputs.scrollTop = outputs.scrollHeight;
});

bash.stdout.on('data', function(d) {
  var data = d.toString('ascii');
  returner.text(data);
  outputs.scrollTop = outputs.scrollHeight;
});

$("#clear").click(function () {
  $(".exec:not(.ptype)").remove();
});

function exname(cmd) {
  return cmd.substr(0, cmd.indexOf(' '));
}

function createSidebar(cmd) {
  var sb = {};

  sb.el = statusblocks.find('.ptype').clone();
  sb.el.removeClass('.ptype').show();
  sb.el.find('h3').text('<span style="color: #6f6">&#x2713;</span> ' + cmd);

  var p = sb.el.find("pre");
  sb.update = function() {
    returner = p;
    bash.stdin.write(cmd + "\n");
  }

  sb.update();
  statusblocks.append(sb.el);
  return sb;
}

//var ls = createSidebar("ls");
//var git = createSidebar("git status -s");

function writeStdin(cmd) {
  var args = cmd.split(' ');
  var command = args.shift();

  if (command === "clear") {
    $("#clear").click();
    return;
  }

  var el = $('.exec').first().clone();
  el.removeClass("ptype");
  el.find('.command').text('✓ ' + command);
  var args_text = '';
  for (var i=0; i < args.length; i++) {
    args_text += ' ' + args[i];
  }
  el.find('.args').text(args_text);

  returner = el.find("pre");
  returner.addClass(exname(cmd));
  returner.text("");
  bash.stdin.write(cmd + "\n");

  switch (command) {
    case "mv":
    case "cd":
    case "cp":
    case "chown":
    case "chmod":
      el.find('.input').addClass('no-output');
      returner.hide();
      break;

      //ls.update();
      //git.update();
  }
  el.find('.input');
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

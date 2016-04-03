# Penultimate

## Inspiration

Today's terminals are a relic of the serial `tty`s and `vt`s of early UNIX. Terminal emulators still start with an empty screen, with a prompt at the top. Command-line input and output are dropped into the same framebuffer, making it difficult to track where output ends and the next line of input begins.

![DEC VT100](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/DEC_VT100_terminal.jpg/270px-DEC_VT100_terminal.jpg)

Besides interactive terminal applications and GUI terminal emulators, the command-line user experience hasn't changed much since the late '70s.

## What it does

## How we built it

Penultimate is a cross-platform (Linux/OS X/Android/Web) node-webkit application.

## Challenges and Accomplishments

We interact with the user's shell by opening a `child_process` and keeping it alive. We send each the user's commands into their shell and collect `stdout` and `stderr` to print in the correct place on the webpage.

It is surprisingly difficult to determine when a shell (e.g. bash) has finished running a command. Because command-line utilities don't always spit out all output at once, and because bash keeps running (to preserve environment variables and other state) between commands, we had to resort to more creative methods to determine whether bash is ready to accept another command.

## What we learned

Quint brushed up on his node.js, process management, and flexbox styling (pre-2015 flexbox is entirely different than today's standard). Will found out just how little `child_process`es are willing to tell their `parent`s.

> "Is there anything you'd like to tell me, `bash`?"
> "No, `node`."

## What's next for Penultimate

Penultimate's source is available [on Github](https://github.com/qguv/penultimate). We built Penultimate because we want to build a better CLI experience, so Patches are very much welcome.

Some items on the Penultimate wishlist:

  - support user-configurable status blocks (currently `ls` and `git status` are displayed on the right)
  - support more user customization, especially with color
  - experiment with alternative layouts
    - try inverting the order that outputs are entered
    - 

![Penultimate](https://raw.githubusercontent.com/qguv/penultimate/master/logo.png)

_Penultimate_ is a re-imagined command line interface inspired by chat clients. It's a terminal emulator for the Web as a platform designed and programmed over the course of about seven hours.

Like in a chat client, the user uses an input field at the bottom of the page to issue commands. A set of panels on the right provides a live-updating view of the current directory, git index, and anything else the user wants to track (WIP).

Users can issue commands to a persistant forking shell process, preserving environment variables, current directory, and other state.

You could use this as a way to securely use a shell on a remote machine through a browser. If the domain is set up with TLS/SSL/HTTPS and .htaccess support, this project also serves as ssh in a browser.

## Installation

Clone the repo and `cd`. `npm install`. Then [download `nw.io`](http://nwjs.io/) to the penultimate directory and run it.

## How it's different

### Separated input and output

Traditional terminals muddle up input and output. Penultimate color-codes and visually separates the two.

### No floating input

Traditional terminals put the edit cursor any old place depending on how tall the last command's outputs were. Penultimate keeps your cursor at the bottom all the time.

### Persistent "status blocks"

Persistent _status blocks_ along the right side of the screen keep up-to-date information about the current directory, git index, and anything else the user wants to track (WIP). No more `clear && ls` habit.

### Status display

Commands are marked with a checkmark if they succeed; i.e. their exit code is zero. (graceful failure is, as always, WIP)

### Host doesn't have to be the client

You can use this as a remote shell, even a secure one if .htaccess and SSL are properly configured. (In this case, just run as a regular node app, ignoring nw.js a.k.a. node-webkit.)

## Inspiration

Today's terminals are a relic of the serial `tty`s and `vt`s of early UNIX. Terminal emulators still start with an empty screen, with a prompt at the top. Command-line input and output are dropped into the same framebuffer, making it difficult to track where output ends and the next line of input begins.

![DEC VT100](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/DEC_VT100_terminal.jpg/270px-DEC_VT100_terminal.jpg)

Besides interactive terminal applications and GUI terminal emulators, the command-line user experience hasn't changed much since the late '70s.

## How we built it

Penultimate is a cross-platform (Linux/OS X/Android/Web) node-webkit application.

## Challenges and Accomplishments

We interact with the user's shell by opening a `child_process` and keeping it alive. We send each the user's commands into their shell and collect `stdout` and `stderr` to print in the correct place on the webpage.

It is surprisingly difficult to determine when a shell (e.g. bash) has finished running a command. Because command-line utilities don't always spit out all output at once, and because bash keeps running (to preserve environment variables and other state) between commands, we had to resort to more creative methods to determine whether bash is ready to accept another command.

Low-level shell interaction across unix pipes also presented some difficulty.

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
    - try moving the input bar to the top
  - ssh login (needs ssh-client on node server)
  - color support with [node-ansi](https://github.com/echicken/node-ansi) or [ansi-to-html](https://github.com/rburns/ansi-to-html)
  - use [is-thirteen](https://github.com/jezen/is-thirteen) to test for enter keypresses (keycode `13`)

![Bash under Penultimate](https://raw.githubusercontent.com/qguv/penultimate/master/bash.png)

## Soylent Art

We [tweeted](https://twitter.com/reggae_snacks/status/716427863910653952) @Soylent with our Soylent art. They re-tweeted it!

<img src="https://raw.githubusercontent.com/qguv/penultimate/master/soylent_art.jpg" alt="Art on a bottle of Soylent" height="400"></img>

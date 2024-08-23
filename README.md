# ScriptMaker

ScriptMaker is a programming language generation tool based on [WebScript](https://github.com/CragglesG/WebScript). It allows you to create your own programming language with ease, so you can comfortably code using a syntax that you know and love, without spending hours making a language yourself.

_Hack Club Arcade Reviewers, see [here](#arcade-reviewers) (not for showcase, only scrapbook)_

_Found a bug? Want a new feature? [Create an issue!](https://github.com/CragglesG/ScriptMaker/issues/new) (Please check for an existing one first to avoid duplicates!)_

_Want to contribute? You can find good first issues [here](https://github.com/CragglesG/ScriptMaker/contribute)._

![ScriptMaker Demo Image](https://cloud-oqart3tgc-hack-club-bot.vercel.app/0terminal_scriptmaker.png)

## Table of Contents
- [Usage Guide](#usage-guide)
    - [Prerequisites](#prerequisites)
    - [Cloning ScriptMaker](#cloning-scriptmaker)
    - [Running ScriptMaker](#running-scriptmaker)
        - [Interactive Mode](#interactive-mode)
        - [File Mode](#file-mode)
    - [Testing Your Language](#testing-your-language)

## Usage Guide

ScriptMaker currently customises WebScript's keywords to modify its syntax. This means that some modifications are not yet supported due to ScriptMaker not being able to edit the underlying lexer, parser, and interpreter. However, this functionality is planned for a future release.

### Prerequisites

Before you download ScriptMaker, you must ensure that Node.js is installed on your computer. You can do this using the command below:

```
node --version
```

If a version number is returned, then Node.js is installed. If not, please install Node.js.

### Cloning ScriptMaker

To download ScriptMaker, you must clone its Git repository. You can do this using the following command:

```
git clone https://github.com/CragglesG/ScriptMaker
```

### Running ScriptMaker

ScriptMaker supports two different modes: interactive mode and file mode. Interactive mode allows you to input your language syntax interactively, right in the command line. File mode reads the syntax from the specified file, which can be useful when you're not using an interactive shell.

#### Interactive Mode

Once you've downloaded ScriptMaker, all you have to do is run the following command:

```
cd ScriptMaker && node generate.js
```

After you have generated your language, you can use the installation script to make it easy to run:

```
chmod +x ./generated/install.sh && ./generated/install.sh
```

That's it! You will now be able to use your new language by entering its name into the command line. You can safely delete the ScriptMaker folder.

#### File Mode

Before you run ScriptMaker in File Mode, you'll need to create a syntax file. Below is an example of a syntax file for WebScript:

```
prepare
as
type
prep
has
func
needs
return
loop
through
while
if
elif
else
```

Here's an explanation of the above file:

```
prepare -> This is used to declare a variable. Equivalent to const/let in JS.
as -> This is used to assign a variable. Equivalent to = in JS.
type -> This is used to create an object.
prep -> This is used to create an instance of an object.
has -> This is used to define the values of an object.
func -> This is used to create a function.
needs -> This is used to assign parameters to a function.
return -> Return from a function
loop -> This is used to create a for loop.
through -> This is used to specify the range of a for loop/assign a counter variable. Example: loop i through (0,5)
while -> This is used to create a while true loop.
if -> If statement
elif -> Else/if statement
else -> Else statement
```

Once you've made a syntax file, you'll need to pass in the full path to ScriptMaker (replace `PATH` with the path to your file):

```
cd ScriptMaker && node generate.js PATH
```

_Tip: if all goes well, there should be no output from this command_

Now that ScriptMaker has generated your language, you can use the installation script to make it easy to run:

```
chmod +x ./generated/install.sh && ./generated/install.sh
```

That's it! You will now be able to use your new language by entering its name into the command line. You can safely delete the ScriptMaker folder.

### Testing Your Language
ScriptMaker automatically generates a test file for your programming language, to aid with debugging the generation and making sure that everything is as desired. You can run it with the command below, make sure to replace `NAME` with the name of your programming language:

```
NAME ~/.NAME/generated/test
```



<br><br><br><br><br><br><br>

#### Arcade Reviewers
This project is based on [WebScript](https://github.com/CragglesG/WebScript) (one of my other projects). However, all commits under this repository (bar the intial commit) were made separate to WebScript. I have used no AI in the process of developing my project.

**Thanks for reviewing my project!**

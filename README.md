# ScriptMaker

ScriptMaker is a programming language generation tool based on [WebScript](https://github.com/CragglesG/WebScript). It allows you to create your own programming language with ease, so you can comfortably code using a syntax that you know and love, without spending hours making a language yourself.

_Hack Club Arcade Reviewers, see [here](#arcade-reviewers)_

_Found a bug? Want a new feature? [Create an issue!](https://github.com/CragglesG/ScriptMaker/issues/new) (Please check for an existing one first to avoid duplicates!)_

_Want to contribute? You can find good first issues [here](https://github.com/CragglesG/ScriptMaker/contribute)._

**There is a known issue with conditionals and while loops. It is currently under investigation.**

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

Once donwloaded, all you have to do is run the following command:

```
cd ScriptMaker && node generate.js
```

After you have generated your language, you can run the installation script to make it easy to run:

```
./generated/install.sh
```

That's it! You will now be able to use your new language by entering its name into the command line.

### Testing Your Language
ScriptMaker automatically generates a test file for your programming language, to aid with debugging the generation and making sure that everything is as desired. You can run it with the command below, make sure to replace `LANG` with the name of your programming language:

```
LANG ~/.LANG/generated/test
```






<br><br><br><br><br><br><br>

#### Arcade Reviewers
This project is based on [WebScript](https://github.com/CragglesG/WebScript) (one of my other projects). However, all commits under this repository (bar the intial commit) were made separate to WebScript. I have used no AI in the process of developing my project.

**Thanks for reviewing my project!**

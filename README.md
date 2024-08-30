# ScriptMaker Demo

Welcome to the ScriptMaker Demo! To start, run `npm run generate` in the terminal below (at the bottom of your screen). Alternatively, you can read more about how to run ScriptMaker in this README.

## Running ScriptMaker

ScriptMaker supports two different modes: interactive mode and file mode. Interactive mode allows you to input your language syntax interactively, right in the command line. File mode reads the syntax from the specified file, which can be useful when you're not using an interactive shell.

### Interactive Mode

To run ScriptMaker in Interactive Mode, all you have to do is run the following command:

```
npm run generate
```

After you have generated your language, you can use the installation script to make it easy to run:

```
chmod +x ./generated/install.sh && ./generated/install.sh
```

That's it! You will now be able to try out your new language by entering its name into the terminal below.

### File Mode

Before you run ScriptMaker in File Mode, you'll need to create a syntax file. Below is an example of a syntax file:

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

The above example uses WebScript's syntax.
Here's an explanation of it:

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

Once you've made a syntax file, you'll need to pass in the path to ScriptMaker (replace `FILE` with the name of your syntax file):

```
npm run generate /home/CragglesG/ScriptMaker/FILE
```

_Tip: if all goes well, there should be no output from this command. You may need to ctrl+c if it doesn't exit within ten or so seconds_

Now that ScriptMaker has generated your language, you can use the installation script to make it easy to run:

```
chmod +x ./generated/install.sh && ./generated/install.sh
```

That's it! You will now be able to try out your new language by entering its name into the terminal below.

## Testing Your Language
ScriptMaker automatically generates a test file for your programming language, to aid with debugging the generation and making sure that everything is as desired. You can run it with the command below, make sure to replace `NAME` with the name of your programming language:

```
NAME ~/.NAME/generated/test
```

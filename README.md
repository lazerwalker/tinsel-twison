# Tinsel-Twison

[![Build Status](https://travis-ci.org/lazerwalker/tinsel-twison.svg?branch=master)](https://travis-ci.org/lazerwalker/tinsel-twison)

Tinsel-Twison is a story format for [Twine 2](http://twinery.org/2) that allows you to use Twine to write stories for the [Tinsel](http://maketinsel.com) platform for making phone tree-based interactive fiction.

It is a fork of the [Twison](https://github.com/lazerwalker/twison) project. The hope is that Twison will one day provide a proper plugin or module system to make this sort of integration easier, but in the meanwhile having this project be a fork of Twison works well enough.

*If you've stumbled upon this*, this repo does work. However, it's still under active development to make it far easier to use before considering it "launched". More documentation, as well as some moderately large changes, are coming very soon.

## Installation 

From the Twine 2 story select screen, add a story format, and point it to the url `http://github.com/lazerwalker/tinsel-twison/raw/master/dist/format.js`.

From within your story, set its story format to Tinsel. Choosing "Play" will now give you a Tinsel-compatible JSON file you can copy and paste straight into the Tinsel web editor at [http://maketinsel.com].

Writing a Tinsel game in Twine is almost, but not quite, like making a regular Twine game. For details, check out the "Writing In Twine" section of the [Tinsel documentation](https://github.com/lazerwalker/tinsel/#writing-in-twine)


## Setting up a development environment 

If you want to contribute to Tinsel-Twison, or are interested in hacking on the source code for any other reason, you should follow the instructions in the parent [Twison README](http://github.com/lazerwalker/twison). Other than cloning this repo instead of the main Twison repo, everything else should be the same.


## License

Twison is licensed under the MIT license. See the LICENSE file for more information.

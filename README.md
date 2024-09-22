# Solo Game Jam

This is just me messing around with JavaScript. The goal is to make a simple 2D game without any
third-party libraries, engines, etc. As this is a learning project, it doesn't have an established
deadline.

It's still pretty early in development.  Thus far, the following is in place:
* A simple game loop with overridable `draw` and `update` methods.
* Sprite sheet support, including breaking up a single image into multiple sub-images (currently
  expects that all sprites have the same dimensions).

## Building

Before you can build the project, you will need both Node Package Manager (NPM) and TypeScript
installed.

Once you've met the requirements, simply run the `npm` build script:

```
npm run build
```

## Running

After building the requisite JavaScript files, simply open `game.html` in your browser of choice.

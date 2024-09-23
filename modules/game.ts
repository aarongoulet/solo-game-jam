import {SpriteSheet} from "./sprites.js";
import {Scene} from "./scene.js";

export class Game {
    private readonly _canvas: HTMLCanvasElement;
    private _lastUpdate: number;
    private readonly _spriteSheet: SpriteSheet;
    private _scene: Scene;

    constructor(canvas: HTMLCanvasElement, spriteSheet: SpriteSheet, startingScene: Scene) {
        this._canvas = canvas;
        this._lastUpdate = 0;
        this._spriteSheet = spriteSheet;
        this._scene = startingScene;
    }

    public start() {
        this.scheduleNextFrame()
    }

    public get context(): CanvasRenderingContext2D {
        let ctx = this._canvas.getContext('2d');
        if (ctx === null) {
            throw new Error("Unable to get canvas context.");
        }

        return ctx;
    }

    public get sprites(): SpriteSheet {
        return this._spriteSheet;
    }

    public get scene(): Scene {
        return this._scene;
    }

    public set scene(scene: Scene) {
        this._scene = scene;
        this._scene.initialize(this)
    }

    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    private run(timestamp: number) {
        // Calculate the time since the last update and draw occurred.
        if (this._lastUpdate == 0) {
            this._lastUpdate = timestamp;
        }
        const delta = timestamp - this._lastUpdate;

        // Update before drawing.
        this.update(delta);

        // Always reset the draw context.
        let ctx = this.context
        ctx.reset()
        ctx.imageSmoothingEnabled = false;
        ctx.scale(4, 4)

        // Initiate drawing.
        this.draw(ctx, delta);
        this._lastUpdate = timestamp;

        // Lastly, schedule the next frame.
        this.scheduleNextFrame();
    }

    private scheduleNextFrame() {
        window.requestAnimationFrame(this.run.bind(this));
    }

    protected draw(context: CanvasRenderingContext2D, delta: number) {
        // Delegate drawing to the current scene.
        this._scene.draw(this, context, delta);
    }

    protected update(delta: number) {
        // Delegate updates to the current scene.
        this._scene.update(this, delta);
    }
}

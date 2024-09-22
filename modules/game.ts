import {SpriteSheet} from "./sprites.js";

export class Game {
    private readonly _canvas: HTMLCanvasElement;
    private _lastUpdate: number;
    private readonly _spriteSheet: SpriteSheet;

    constructor(canvas: HTMLCanvasElement, spriteSheet: SpriteSheet) {
        this._canvas = canvas;
        this._lastUpdate = 0;
        this._spriteSheet = spriteSheet;
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
        // The following is for demo purposes only.
        let offsetX = 16
        let offsetY = 26
        context.drawImage(this.sprites.getByIndex(5), offsetX, offsetY);
        context.drawImage(this.sprites.getByIndex(20), offsetX + 16, offsetY);
        context.drawImage(this.sprites.getByIndex(143), offsetX + 32, offsetY);
        context.drawImage(this.sprites.getByIndex(7), offsetX + 64, offsetY);
        context.fillStyle = "#ffff00";
        context.font = "9px sans-serif"
        let fps = (1000 / delta).toFixed()
        const output = `${fps} FPS`
        context.fillText(output, 2, 10, 300)

        // Real rendering code should go here.
    }

    protected update(delta: number) {
        // Game state updates go here.  Delta is the number of milliseconds passed since the last update.
    }
}

import {Scene} from "./scene.js";
import {Game} from "./game.js";

export class DemoScene extends Scene {

    public draw(game: Game, context: CanvasRenderingContext2D, delta: number) {
        // The following is for demo purposes only.
        let maxX = game.canvas.width;
        let cursorX = 0;
        let cursorY = 0;

        for (let index = 0; index < game.sprites.length; index++) {
            context.drawImage(game.sprites.getByIndex(index), cursorX, cursorY);
            cursorX += 16;
            if (cursorX + 16 > maxX) {
                cursorX = 0;
                cursorY += 16;
            }
        }

        // Render FPS.
        context.fillStyle = "#ffff00";
        context.font = "7px sans-serif"
        context.shadowColor = "#000000";
        context.shadowBlur = 1;
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        let fps = (1000 / delta).toFixed()
        const output = `${fps} FPS`
        context.fillText(output, 2, 10, 300)
    }
}

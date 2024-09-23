import {Game} from "./game.js";

export class Scene {
    public initialize(game: Game): void {}
    public draw(game: Game, context: CanvasRenderingContext2D, delta: number) {}
    public update(game: Game, delta: number) {}
}

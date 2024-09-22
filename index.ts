import {SpriteSheet} from "./modules/sprites.js";
import {Game} from "./modules/game.js";


async function main() {
    let canvas = document.getElementById("game") as HTMLCanvasElement;
    let sheet = await SpriteSheet.create("sprites.png");
    let game = new Game(canvas, sheet)
    game.start()
}


window.onload = main;

import Renderer from "./Renderer";
import Board from "./Board";
import Player from "./Player";
import { Wall } from "./Field";

class Game {
  public renderer: Renderer;
  private _keyboard: { [key: string]: boolean };
  constructor() {
    if(window.isPlaying) {
      return;
    }
    window.isPlaying = true;

    this._keyboard = {};
    window.addEventListener("keydown", (e) => { this._keyboard[e.keyCode] = true }, false);
    window.addEventListener("keyup",   (e) => { this._keyboard[e.keyCode] = false }, false);

    this.renderer = new Renderer();

    const player1 = new Player();

    setTimeout( () => {
      const board = new Board();
      player1._board = board;

      const p1 = new Wall();

      this.renderer.on('tick', Δ => {
        player1.handleKeyboard(this._keyboard);
        p1.x = player1.x;
        p1.y = player1.y;
        player1.move(Δ, board);
      });
    }, 0);

    
  }
}

export default new Game();


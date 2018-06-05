import Renderer from "./Renderer";
import Board from "./Board";

class Game {
  public renderer: Renderer;
  constructor() {
    if(window.isPlaying) {
      return;
    }
    window.isPlaying = true;
    
      this.renderer = new Renderer();
    setTimeout( () => {
      const board = new Board();
    }, 0);
    // renderer.on('tick', delta => console.log(delta) );
  }
}

export default new Game();


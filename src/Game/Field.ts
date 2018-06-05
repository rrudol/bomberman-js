import Game from './';
import GamePrimitive, { RectanglePrimitive } from './GamePrimitive';

let BlockSize = 48;

export default class Field {
  public type: number;
  private sprite: any;
  constructor(type: number, color?: number) {
    this.type = type;
    this.sprite = color ? new GamePrimitive(RectanglePrimitive(color), Game.renderer.stage) 
      : new GamePrimitive(new PIXI.Graphics(), Game.renderer.stage);
    this.sprite._w = BlockSize;
    this.sprite.x = 10;
    this.sprite.y = 10;
  }
  set x(x) {
    this.sprite.x = x;
  }
  set y(y) {
    this.sprite.y = y;
  }
  free() {
    this.sprite.free();
  }
}

export const BricksType = 1;
export class Bricks extends Field {
  constructor() { super(BricksType, 0xFFFF00); }
}

export const WallType = 2;
export class Wall extends Field {
  constructor() { super(WallType, 0xFF00FF); }
}

export const BombType = 3;
export class Bomb extends Field {
  constructor() { super(BombType, 0x111111); }
}
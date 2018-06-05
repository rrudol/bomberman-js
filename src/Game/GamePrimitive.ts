import * as PIXI from "pixi.js";

export const RectanglePrimitive = (color: number) => {
  let rectangle = new PIXI.Graphics();
  rectangle.lineStyle(4, 0xFF3300, 1);
  rectangle.beginFill(color || 0x66CCFF);
  rectangle.drawRect(0, 0, 48, 48);
  rectangle.endFill();
  // rectangle.x = x * 48;
  // rectangle.y = y * 48;
  return rectangle;
}

export default class GamePrimitive {
  private obj: any;
  public _x: number;
  public _y: number;
  public _w: number;
  private stage: any;
  constructor(obj: any, stage: any) {
    this._x = 0;
    this._y = 0;
    this._w = 48;
    this.obj = obj;
    this.stage = stage;
    this.stage.addChild(this.obj);
  }
  free() {
    this.stage.removeChild(this.obj);
  }
  get x() {
    return this._x;
  }
  set x(i) {
    if(i<0) i =0;
    this._x = i;
    this.obj.x = i * this._w;
  }
  get y() {
    return this._y;
  }
  set y(i){
    if(i<0) i =0;
    this._y = i;
    this.obj.y = i * this._w;
  }
  set w(i: number) {
    this._w = i;
    this.x = this.x;
    this.y = this.y;
    // this.obj.drawRect(0, 0, i, i);
  }
}
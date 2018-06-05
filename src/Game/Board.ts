import Field, { Bricks, Wall } from './Field';

function GenerateField(x, y) {
  if( ((x%2)===1) && ((y%2)===1) ) return new Wall();
  if( (x<2) && (y<2) ) return new Field(0);
  const v = Math.floor(Math.random() * 2);
  // if(v) new Colider(x, y, this._engine.stage);
  return v ? new Field(0) : new Bricks;
}

export default class Board {
  public _map: Field[][];
  constructor() {
    console.log('Creating Board');
    this._map = Array(13).fill(0).map((_, y) => Array(13).fill(0).map( (_, x) => {
      const field = GenerateField(x, y);
      field.x = x;
      field.y = y;
      return field;
    }));
  }
}
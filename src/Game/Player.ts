import Game from './';
import Field, { Bomb } from './Field';
import Board from './Board';

export default class Player {
  private _x: number = 0;
  private _y: number = 0;
  private _vx: number = 0;
  private _vy: number = 0;
  private _speed: number = 0.05;
  public _map: number[][];
  public _board: Board;
  constructor() {
    // setInterval(()=>console.log(this), 200)
  }
  handleKeyboard(keyboard: { [key: string]: boolean }) {
    let vx = 0, vy = 0;
    if(!this.vy) {
      if(keyboard[37]) vx -= 1;
      if(keyboard[39]) vx += 1;
    }
    if(!this.vx) {
      if(keyboard[38]) vy -= 1;
      if(keyboard[40]) vy += 1;
    }
    if(keyboard[13]) {
      const {x, y} = this.pos;
      this._board._map[y][x].free();
      this._board._map[y][x] = new Bomb();
      this._board._map[y][x].x = x;
      this._board._map[y][x].y = y;
      setTimeout(()=>{
        this._board._map[y][x].free();
        this._board._map[y][x] = new Field(0);
        this._board._map[y][x].x = x;
        this._board._map[y][x].y = y;

        const willBeDestroyed = (x, y) => {
          try {
            if(this._board._map[y][x].type === 1) {
              this._board._map[y][x].free();
              this._board._map[y][x] = new Field(0);
              this._board._map[y][x].x = x;
              this._board._map[y][x].y = y;
            }
          } catch(err) {};
        };
        willBeDestroyed(x, y-1);
        willBeDestroyed(x, y+1);
        willBeDestroyed(x-1, y);
        willBeDestroyed(x+1, y);
      }, 2000);
    }
    this.vx = vx;
    this.vy = vy;
  }
  move(Δ: number, coliders: Board) {
    // this.smooth(coliders);
    this.detect(coliders);
    this._y += this.vy * this.speed * Δ;
    this._x += this.vx * this.speed * Δ;
    if(this._y < 0 ) this._y = 0;
    if(this._x < 0 ) this._x = 0;
  }
  detect(map: Board) {
    const {x, y} = this.pos;
    let {vx, vy} = this;
    const surroundings = [];
    surroundings[-1] = [-1, -1, -1];
    surroundings[0] = [-1, -1, -1];
    surroundings[1] = [-1, -1, -1];
    for(let i = -1; i <= 1; i++)
    for(let j = -1; j <= 1; j++) {
      try {
        surroundings[j][i] = map._map[y+j][x+i].type;
      } catch(err) {
        surroundings[j][i] = 2;
      }
    }
    if(vx > 0) {
      console.log(surroundings[-1][-1], surroundings[-1][0], surroundings[-1][1]);
      console.log(surroundings[0][-1], surroundings[0][0], surroundings[0][1]);
      console.log(surroundings[1][-1], surroundings[1][0], surroundings[1][1]);
      console.log('----')
      if(surroundings[0][1]) {
        if(this._x + 0.5 > x+0.5) vx = 0;
      }
    } else if(vx < 0) {
      if(surroundings[0][-1]) {
        if(this._x - 0.5 < x-0.5) vx = 0;
      }
    }
    if(Math.abs(this.vx)>0) {
      if(this.touching.y < y) { // Jeśli dotykasz pola wyzej
        console.log('kolizja u gory')
        if(!surroundings[-1][this.vx>0 ? 1 : -1]) {
          vx = 0;
          vy = -1;
        } else {
          if(!surroundings[0][this.vx>0 ? 1 : -1]) {
            vy = 1;
          }
          vx = 0;
        }
      } else if(this.touching.y > y) { // Jeśli dotykasz pola nizej
        if(!surroundings[1][this.vx>0 ? 1 : -1]) {
          vx = 0;
          vy = 1;
        } else {
          if(!surroundings[0][this.vx>0 ? 1 : -1]) {
            vy = -1;
          }
          vx = 0;
        }
      }
    }

    if(vy > 0) {
      console.log(surroundings[-1])
      console.log(surroundings[0])
      console.log(surroundings[1])
      console.log('----')
      if(surroundings[1][0]) {
        if(this._y + 0.5 > y+0.5) vy = 0;
      };
    } else if(vy < 0) {
      if(surroundings[-1][0]) {
        if(this._y - 0.5 < y-0.5) vy = 0;
      }
    }

    if(Math.abs(this.vy)>0) {
      if(this.touching.x < x) { // Jeśli dotykasz pola wyzej
        if(!surroundings[this.vy>0 ? 1 : -1][-1]) {
          vy = 0;
          vx = -1;
        } else {
          if(!surroundings[this.vy>0 ? 1 : -1][0]) {
            vx = 1;
          }
          vy = 0;
        }
      } else if(this.touching.x > x) { // Jeśli dotykasz pola nizej
        if(!surroundings[this.vy>0 ? 1 : -1][1]) {
          vy = 0;
          vx = 1;
        } else {
          if(!surroundings[this.vy>0 ? 1 : -1][0]) {
            vx = -1;
          }
          vy = 0;
        }
      }
    }

    this.vx = vx;
    this.vy = vy;
  }
  get speed() {
    return this._speed;
  }
  get pos() {
    return { x: Math.round(this.x), y: Math.round(this.y) }
  }
  get touching() {
    let r = this.pos;
    [ [Math.round(this.x+0.3), Math.round(this.y+0.3)],
      [Math.round(this.x-0.3), Math.round(this.y+0.3)],
      [Math.round(this.x-0.3), Math.round(this.y-0.3)],
      [Math.round(this.x+0.3), Math.round(this.y-0.3)] ].forEach( e => {
        if( !((this.pos.x === e[0]) && (this.pos.y === e[1])) ) {
          r = { x: e[0], y: e[1] };
        }});
    return r;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get vx() {
    return this._vx;
  }
  set vx(i) {
    this._vx = i;
  }
  get vy() {
    return this._vy;
  }
  set vy(i) {
    this._vy = i;
  }
}
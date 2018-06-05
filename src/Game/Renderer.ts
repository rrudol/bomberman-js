import * as PIXI from 'pixi.js';
import EventEmitter from 'events';

let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
};

const defaultConfig = { 
  width: 800,
  height: 600,
  antialias: true,
  transparent: false,
  resolution: 1
};

export default class Renderer extends EventEmitter {
  private _app: PIXI.Application;
  constructor() {
    super();
    this._app = new PIXI.Application(defaultConfig);
    this.background = 0xbada55;
    this._app.renderer.view.style.position = "absolute";
    this._app.renderer.view.style.display = "block";
    this._app.renderer.autoResize = true;
    this._app.renderer.resize(window.innerWidth, window.innerHeight);

    const DOMElement = document.getElementById('game');
    if(DOMElement) {
      DOMElement.innerHTML = '';
      DOMElement.appendChild(this._app.view);
    }

    this._app.ticker.add(Δ => this.emit('tick', Δ));
  }
  set background(color) {
    this._app.renderer.backgroundColor = color;
  }
  get stage() {
    return this._app.stage;
  }
}
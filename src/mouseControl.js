export class MouseControl {
  mouse = {
    x: 0,
    y: 0,
    isPressed: false,
  };

  constructor($elem) {
    this.$el = $elem;
    this.initMouseListeners();
  }

  initMouseListeners() {
    const listeners = [
      {
        type: "mousemove",
        handler: this.onMouseover,
      },
      {
        type: "mousedown",
        handler: this.onMousedown,
      },
      {
        type: "mouseup",
        handler: this.onMouseup,
      },
    ];

    listeners.forEach((l) => {
      this.$el.addEventListener(l.type, l.handler.bind(this));
    });
  }

  onMouseover(e) {
    this._setMousePosition(e);
  }

  onMousedown(e) {
    this._setMousePosition(e);
    this.mouse.isPressed = true;
  }

  onMouseup(e) {
    this._setMousePosition(e);
    this.mouse.isPressed = false;
  }

  _setMousePosition(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}

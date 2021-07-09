import { MouseControl } from "./mouseControl";
import { getRandomInt, getRandomColor } from "./utils";

import { RunningLine } from "./objects";

export class Layer {
  mouse = null;

  constructor(selector) {
    this.$el = document.querySelector(selector);
    if (!this.$el) throw TypeError("Elem is undefined!");

    this._createCanvas();
    this.mouse = new MouseControl(this.$canvas).mouse;

    this.lines = [];
    for (let i = 0; i < 5; i++) {
      const nex = ((getRandomInt(0, this.$canvas.width) / 120) | 0) * 120;
      const ney = ((getRandomInt(0, this.$canvas.height) / 120) | 0) * 120;
      if ((ney / 120) % 2) nex += 120;

      this.lines.push(
        new RunningLine({
          x: nex,
          y: ney,
          line: 40,
          strokeStyle: getRandomColor(10).rgbaStr,
          contex: this.ctx,
          onUpdate: () => {
            this.currentStepsCount++;
          },
        })
      );
    }

    this.currentStepsCount = 0;
    this.edgeSteps = 50;
  }

  update() {
    // this.ctx.fillStyle = "rgba(30,30,30,0.03)";
    // this.ctx.shadowColor = "rgba(0,0,0,1)";
    // this.ctx.shadowBlur = 1;
    // this.ctx.fillRect(0, 0, this.$canvas.width, this.$canvas.height);

    if (this.currentStepsCount >= this.edgeSteps * this.lines.length) {
      this.lines.forEach((ln) => {
        ln.strokeStyle = getRandomColor(10).rgbaStr;
      });
      this.currentStepsCount = 0;
    }

    this.lines.forEach((ln) => ln.update());
    this.lines.forEach((ln) => ln.draw());

    this.requsetAnimationFrameId = requestAnimationFrame(() => {
      this.update();
    });
  }

  _createCanvas() {
    this.$canvas = document.createElement("canvas");
    this.$canvas.style.width = "100%";
    this.$canvas.style.height = "100%";

    this.ctx = this.$canvas.getContext("2d");
    this.ctx.beginPath();

    const onResizeCanvas = () => {
      this.$canvas.width = this.$el.clientWidth * 2;
      this.$canvas.height = this.$el.clientHeight * 2;
    };

    window.addEventListener("resize", onResizeCanvas);
    onResizeCanvas();

    this.$el.insertAdjacentElement("afterbegin", this.$canvas);
  }

  _destroy() {
    cancelAnimationFrame(this.requsetAnimationFrameId);
  }
}

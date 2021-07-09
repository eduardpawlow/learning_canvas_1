class Component {
  constructor(props) {
    if (
      props.x === undefined ||
      props.x === null ||
      props.y === undefined ||
      props.y === null
    )
      throw new TypeError("Need coords!");
    this.x = props.x;
    this.y = props.y;
    this.contex = props.contex;
  }

  draw() {}

  update() {}
}

export class Rect extends Component {
  constructor(props) {
    super(props);
    this.width = props.width;
    this.height = props.height;
  }

  isOver(mouse) {
    return (
      mouse.x >= this.x &&
      mouse.x <= this.x + this.width &&
      mouse.y >= this.y &&
      mouse.y <= this.y + this.height
    );
  }
}

export class RunningLine extends Component {
  lastAngle = 0;
  line = 10;
  strokeStyle = "rgba(0,0,0,1)";
  onUpdate = null;

  constructor(props) {
    super(props);

    this.newX = props.x;
    this.newY = props.y;

    if (props.lastAngle) this.lastAngle = props.lastAngle;
    if (props.line) this.line = props.line;
    if (props.strokeStyle) this.strokeStyle = props.strokeStyle;
    if (props.onUpdate) this.onUpdate = props.onUpdate;
  }

  update() {
    this.calc();

    if (this.onUpdate) this.onUpdate();
  }

  draw() {
    this.contex.strokeStyle = this.strokeStyle;
    this.contex.beginPath();
    this.contex.moveTo(this.x, this.y);
    this.contex.lineTo(this.newX, this.newY);
    this.contex.stroke();
    this.contex.closePath();

    this.x = this.newX;
    this.y = this.newY;
  }

  calc() {
    if (
      this.x <= 0 ||
      this.y <= 0 ||
      this.x >= this.contex.canvas.width ||
      this.y >= this.contex.canvas.height
    ) {
      this.lastAngle -= 60;
    } else
      this.lastAngle =
        ((Math.random() * 2) | 0) % 2 === 0
          ? this.lastAngle + 60
          : this.lastAngle - 60;

    if (this.lastAngle >= 360) this.lastAngle = 0;

    if (this.lastAngle < 0) this.lastAngle = 300;

    const angleRadian = (this.lastAngle / 180) * Math.PI;
    this.newX = this.x + Math.cos(angleRadian) * this.line;
    this.newY = this.y + Math.sin(angleRadian) * this.line;
  }
}

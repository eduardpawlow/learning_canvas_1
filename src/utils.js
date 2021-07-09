export function getRandomInt(min = 0, max = 100) {
  return ((Math.random() * max) | 0) + min;
}

export function getRandomColor(step = 1) {
  const maxRandom = 255 / step;

  const rgba = {
    red: getRandomInt(0, maxRandom) * step,
    green: getRandomInt(0, maxRandom) * step,
    blue: getRandomInt(0, maxRandom) * step,
    alpha: 1,
  };

  return {
    rgba,
    rgbaStr: `rgba(${Object.values(rgba).join(", ")})`,
  };
}

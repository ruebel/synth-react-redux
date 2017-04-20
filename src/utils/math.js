export const scaleNumber = (n = 0) => {
  const abs = Math.abs(n);
  return abs > 1000 ? `${(n / 1000).toFixed(1)}k` :
  abs < 1 ? n.toFixed(2) :
  n.toFixed(1);
};

export const getRandomInt = (min = 0, max = 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const scaleNumber = (n = 0) => {
  const abs = Math.abs(n);
  return abs > 1000 ? `${(n / 1000).toFixed(1)}k` :
  abs < 1 ? n.toFixed(2) :
  n.toFixed(1);
};

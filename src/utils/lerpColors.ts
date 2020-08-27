export const lerpColor = (a: string, b: string, amount: number): string => {
  const ah = +a.replace("#", "0x"),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = +b.replace("#", "0x"),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);

  return (
    "#" + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
  );
};

export const lerpColors = (colors: string[], percent: number): string => {
  if (colors.length === 1) return colors[0];

  const deltaStep = 1 / (colors.length - 1);
  const leftIndex = Math.floor(percent / deltaStep);
  if (leftIndex + 1 === colors.length) {
    return colors[leftIndex];
  }
  const rightIndex = leftIndex + 1;

  const x = percent / deltaStep - leftIndex;

  return lerpColor(colors[leftIndex], colors[rightIndex], x);
};

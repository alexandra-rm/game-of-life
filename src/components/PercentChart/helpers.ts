const startAngle = (Math.PI / 4) * 3;
const endAngle = (Math.PI * 9) / 4;

export const writePercent = (
  context: CanvasRenderingContext2D,
  percent: number,
  fontSize = 16,
  color = "black"
): void => {
  const oldFillStyle = context.fillStyle;
  context.fillStyle = color;
  context.fillText(
    `${percent.toFixed(1)}%`,
    context.canvas.width / 2,
    (context.canvas.height + fontSize) / 2
  );
  context.fillStyle = oldFillStyle;
};

const getFilledAngle = (filledPercent: number): number => {
  return startAngle + (endAngle - startAngle) * filledPercent;
};

export const drawChartLine = (
  context: CanvasRenderingContext2D,
  filledPercent: number,
  color = "black"
): void => {
  const { width, height } = context.canvas;

  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, context.canvas.height) / 2 - context.lineWidth,
    startAngle,
    getFilledAngle(filledPercent)
  );

  const oldStrokeStyle = context.strokeStyle;
  context.strokeStyle = color;

  context.stroke();
  context.strokeStyle = oldStrokeStyle;
};

export const clearCanvas = (
  context: CanvasRenderingContext2D,
  color = "white"
): void => {
  const { width, height } = context.canvas;
  const oldFillStyle = context.fillStyle;

  context.fillStyle = color;
  context.fillRect(0, 0, width, height);

  context.fillStyle = oldFillStyle;
};

export const drawChart = (
  context: CanvasRenderingContext2D,
  percent: number,
  bgColor = "white",
  emptyChartColor = "black",
  filledChartColor = "green",
  fontSize = 16,
  color = "black"
): void => {
  clearCanvas(context, bgColor);

  drawChartLine(context, 1, emptyChartColor);

  if (percent > 1e-5) {
    drawChartLine(context, percent, filledChartColor);
  }
  writePercent(context, percent * 100, fontSize, color);
};

export const lerp = (left: number, right: number, x: number): number => {
  return left + (right - left) * x;
};

import React from "react";
import styled from "@emotion/styled";
import { lerpColors } from "@/utils/lerpColors";
import { PercentChartProps } from "./PercentChartProps";
import { PercentChartState } from "./PercentChartState";
import { drawChart, lerp } from "./helpers";

const Canvas = styled.canvas`
  width: 100%;
  height: auto;
  margin: 0 auto;
`;

class PercentChart extends React.Component<
  PercentChartProps,
  PercentChartState
> {
  constructor(props: PercentChartProps) {
    super(props);
    this.canvasRef = React.createRef();

    this.filled = 0;
    this.startFilled = 0;

    this.state = {
      oldPercent: 0,
    };
  }

  static defaultProps = {
    speed: 200,
    width: 800,
    height: 800,
    resolution: 720,
    fontSize: 80,
    lineWidth: 15,
    color: "black",
    bgColor: "white",
    chartBgColor: "black",
    chartColors: ["#3aeb34", "#eb4334"],
  };

  componentDidMount() {
    this.setupCanvas();
    this.updateValue();
  }

  componentDidUpdate(prevProps: PercentChartProps) {
    const {
      lineWidth,
      fontSize,
      percent,
      resolution,
      color,
      bgColor,
      chartBgColor,
      chartColors,
    } = this.props;

    if (prevProps.lineWidth != lineWidth || prevProps.fontSize != fontSize) {
      this.setupCanvas();
      this.updateValue();
    } else if (
      prevProps.percent != percent ||
      prevProps.resolution != resolution ||
      prevProps.color != color ||
      prevProps.bgColor != bgColor ||
      prevProps.chartBgColor != chartBgColor ||
      prevProps.chartColors != chartColors
    ) {
      this.updateValue();
    }
  }

  setupCanvas = (): void => {
    const { lineWidth, fontSize } = this.props;

    const canvas = this.canvasRef.current;
    const context: CanvasRenderingContext2D = canvas.getContext("2d");

    context.imageSmoothingEnabled = false;
    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.font = `${fontSize}px Arial`;
    context.textAlign = "center";
  };

  updateValue = (): void => {
    if (!this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(this.draw);
  };

  draw = (timestamp: number) => {
    const {
      percent,
      bgColor,
      fontSize,
      color,
      chartBgColor,
      chartColors,
      speed,
    } = this.props;

    const { oldPercent } = this.state;

    const targetPercentValue = Math.max(0, Math.min(percent, 1));

    if (!this.startTimestamp || oldPercent != targetPercentValue) {
      this.startTimestamp = timestamp;
      this.startFilled = this.filled;
      this.setState({ oldPercent: targetPercentValue });
    }

    let animationProgress = (timestamp - this.startTimestamp) / speed;
    if (1 - animationProgress < 1e-5) {
      animationProgress = 1;
    }

    this.filled = lerp(this.startFilled, targetPercentValue, animationProgress);

    const filledColor = lerpColors(chartColors, this.filled);

    const canvas = this.canvasRef.current;
    const context: CanvasRenderingContext2D = canvas.getContext("2d");

    drawChart(
      context,
      this.filled,
      bgColor,
      chartBgColor,
      filledColor,
      fontSize,
      color
    );

    if (1 - animationProgress < 1e-5) {
      this.startTimestamp = null;
    } else {
      this.animationFrame = requestAnimationFrame(this.draw);
    }
  };

  render() {
    const { resolution } = this.props;
    return (
      <Canvas
        ref={this.canvasRef}
        width={`${resolution}px`}
        height={`${resolution}px`}
      />
    );
  }
}

export { PercentChart };

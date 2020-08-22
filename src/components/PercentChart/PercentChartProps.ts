export interface PercentChartProps {
  /**
   * Значение графика (от 0 до 1)
   */
  percent: number;
  /**
   * Разрешение изображения
   */
  resolution?: number;
  /**
   * Ширина линии графика
   */
  lineWidth?: number;
  /**
   * Размер шрифта
   */
  fontSize?: number;
  /**
   * Цвет текста
   */
  color?: string;
  /**
   * Цвет фона
   */
  bgColor?: string;
  /**
   * Цвет незаполненной зоны графика
   */
  chartBgColor?: string;
  /**
   * Список цветов графика в hex
   */
  chartColors?: string[];
  /**
   * Время (в мс), за которое будет происходить обновление значения графика
   */
  speed?: number;
}

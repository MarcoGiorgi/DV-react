const GRAPH_COLORS = [
  '#5A93BD',
  '#E26E68',
  '#84C789',
  '#FFD53D',
  '#A47BCE',
  '#FFA15D',
  '#C7C7C7',
  '#B77D55',
  '#FFBDD1',
];

export class GraphColors {
  constructor() {
    this.index = 0;
    this.hashedColours = {};
  }

  next(key) {

    if (key && this.hashedColours[key]) {
      return this.hashedColours[key];
    }

    const color = GRAPH_COLORS[this.index++];
    this.index = this.index % GRAPH_COLORS.length;

    if (key) {
      this.hashedColours[key] = color;
    }

    return color;
  }
}

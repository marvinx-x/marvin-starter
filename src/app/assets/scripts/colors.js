import colorsSCSS from '../styles/_colors.scss';

export class Colors {

  constructor() {
    this.scssColors = colorsSCSS;
    this.objColors = this.getObjColors(colorsSCSS);
    this.objValuesHSL = this.getObjValuesHSL(this.objColors);
    this.objValuesHEX = this.getObjValuesHEX(this.objColors);
    this.objValuesRGB = this.getObjValuesRGB(this.objColors);
  }

  getObjColors(obj) {
    return Object.fromEntries(Object.entries(obj).map(entry => [entry[0], JSON.parse(entry[1].replace(/[']+/g, ''))]));
  }

  getObjValuesHSL(obj) {
    return Object.fromEntries(Object.entries(obj).map(entry => [entry[0], this.getValuesHSL(entry[1])]));
  }

  getObjValuesHEX(obj) {
    return Object.fromEntries(Object.entries(obj).map(entry => [entry[0], this.getValuesHEX(entry[1])]));
  }

  getObjValuesRGB(obj) {
    return Object.fromEntries(Object.entries(obj).map(entry => [entry[0], this.getValuesRGB(entry[1])]));
  }

  getValuesHSL(entry) {
    return `hsl(${entry.hue}, ${entry.saturation}%, ${entry.lightness}%)`;
  }

  getValuesHEX(entry){
    const h = entry.hue;
    const s = entry.saturation;
    let l = entry.lightness;
    l /= 100;
    const a = s * Math.min(l,1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }


  getValuesRGB(entry) {
    let h = entry.hue;
    let s = entry.saturation;
    let l = entry.lightness;
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return `rgb(${Math.round(255 * f(0))}, ${Math.round(255 * f(8))}, ${Math.round(255 * f(4))})`;
  }
}

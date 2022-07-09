import { Colors } from './../../assets/scripts/colors';

export class styleguideColors extends Colors{

  constructor() {
    super();
    this.setupHTML(this.objColors);
  }

  setupHTML(obj) {
    document.querySelector('.styleguide-colors').innerHTML = `${Array(Object.keys(obj).length).fill().map((col, key) =>
      `<div class="col">
        <h4>${Object.keys(obj)[key]}</h4>
        <div class="color-values">
          <p>${Object.values(this.objValuesHSL)[key]}</p>
          <p>${Object.values(this.objValuesHEX)[key]}</p>
          <p>${Object.values(this.objValuesRGB)[key]}</p>
        </div>
        <ul>${Array(5).fill().map((_,i) => `<li style="background-color:${this.decreaseColor(key, i)}"></li>`).join('')}</ul>
      </div>`
    ).join('')}`;
  }

  decreaseColor(key,i) {
    const incrementValue = key === 3 ? 2.2 : 6;
    const valuesHSL = Object.values(this.objColors)[key];
    const valueDecreased = `hsl(${valuesHSL.hue}, ${valuesHSL.saturation}%, ${valuesHSL.lightness+(incrementValue*i)}%)`;
    return valueDecreased;
  }
}

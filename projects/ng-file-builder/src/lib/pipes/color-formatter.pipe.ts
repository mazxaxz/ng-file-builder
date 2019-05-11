import { Pipe, PipeTransform } from '@angular/core';
import { rgbStringToArray, fullRgbToHex } from '../helpers/ColorHelpers';

@Pipe({
  name: 'colorFormatter'
})
export class ColorFormatterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value || value.startsWith('http')) return '';

    if (value.startsWith('#')) return value;

    const colorArray = rgbStringToArray(value);
    if (colorArray.length === 0) return '';

    return fullRgbToHex(colorArray[0], colorArray[1], colorArray[2]);
  }

}

export function rgbToHex(value: number): string {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

export function fullRgbToHex(r: number, g: number, b: number): string {
    return '#' + rgbToHex(r) + rgbToHex(g) + rgbToHex(b);
}

export function rgbStringToArray(rgb: string): number[] {
    const val = rgb.substring(0, rgb.indexOf(')'));
    return val.replace('rgb(', '').replace('rgba(', '')
        .split(',').map(val => +val);
}
export function ConvertPixelsToNumber(pixelValue: any): number {
    return pixelValue.replace('px', '') << 0;
}
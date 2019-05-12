import { ValidatorFn } from "@angular/forms";

export enum PageDensity {
    PPI_72 = "72ppi",
    PPI_96 = "96ppi",
    PPI_150 = "150ppi"
}

export enum PageSize {
    A7 = "A7",
    A6 = "A6",
    A5 = "A5",
    A4 = "A4"
}

export enum PageOrientation {
    Horizontal = "horizontal",
    Vertical = "vertical"
}

export interface BuilderControl {
    label: string;
    name: string;
    validators: ValidatorFn[];
}

export interface ButtonToggler {
    label?: string;
    icon?: string;
    value: any;
}

export enum DefaultBlocks {
    QrCode = "qrcode",
    Square = "square",
    Header = "header",
    Paragraph = "paragraph",
    Image = "image"
}

export enum BackgroundType {
    Color = "color",
    Url = "url-image",
    Texture = "texture"
}

export enum TextAlignment {
    Left = "left",
    Center = "center",
    Right = "right",
    Justify = "justify"
}

export enum BorderStyle {
    None = "none",
    Solid = "solid",
    Dotted = "dotted",
    Dashed = "dashed",
    Double = "double",
    Groove = "groove",
    Ridge = "ridge",
    Inset = "inset",
    Outset = "outset"
}
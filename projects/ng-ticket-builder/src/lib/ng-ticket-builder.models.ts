import { ValidatorFn } from "@angular/forms";

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
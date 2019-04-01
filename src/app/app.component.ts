import { Component } from '@angular/core';
import { BuilderControl } from 'projects/ng-ticket-builder/src/public_api';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ld-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-demo';
  exampleHtml = '<h1 style="font-size: 16px; display: block; position: absolute; top: 20px; left: 20px">TEST HEADER BOOM BOOM BOOM I WANT YOU IN MY ROOM</h1>';
  inputs: BuilderControl[] = [
    { label: 'Listed name', name: 'listedName', validators: [Validators.required, Validators.minLength(3)] },
    { label: 'Price', name: 'price', validators: [Validators.required] }
  ]
}

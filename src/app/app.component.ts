import { Component } from '@angular/core';
import { BuilderControl } from 'projects/ng-file-builder/src/public_api';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ld-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-demo';
  exampleHtml = `
    <h1 style="font-size: 16px; display: block; position: absolute; top: 20px; left: 20px;">
      TEST HEADER BOOM BOOM BOOM I WANT YOU IN MY ROOM
    </h1>
    <div style="position: absolute; top: 100px; left: 100px; background: #4bab00; z-index: 999;width: 100px; height: 100px;"></div>
    <div style="position: absolute; top: 150px; left: 150px; background: #007dab; z-index: 100;width: 100px; height: 100px;"></div>
  `;

  inputs: BuilderControl[] = [
    { label: 'Listed name', name: 'listedName', validators: [Validators.required, Validators.minLength(3)] },
    { label: 'Price', name: 'price', validators: [Validators.required] }
  ]

  onSave(event) {
    console.log(event);
  }
}

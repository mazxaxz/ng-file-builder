import { Component } from '@angular/core';

@Component({
  selector: 'ld-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-demo';
  exampleHtml = '<h1 style="font-size: 16px; display: block; position: absolute; top: 20px; left: 20px">TEST HEADER</h1>'
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mzx-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  navigateToRepository() {
    window.open('https://github.com/mazxaxz/ng-file-builder', '_blank');
  }

}

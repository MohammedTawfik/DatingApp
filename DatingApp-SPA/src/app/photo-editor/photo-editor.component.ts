import { IPhoto } from './../_models/IPhoto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: IPhoto[];
  constructor() { }

  ngOnInit() {
  }

}

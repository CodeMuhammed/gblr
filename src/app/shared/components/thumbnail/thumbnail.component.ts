import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent {
  public defaultImage: string = 'assets/images/user.png';
  public defaultWidth: string = '2.5em';
  public defaultHeight: string = '2.5em';

  @Input() image: string;
  @Input() width: string;
  @Input() height: string;
}

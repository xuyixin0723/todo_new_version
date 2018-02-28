import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fillerNav = Array(5).fill(0).map((_, i) => `Nav Item ${i + 1}`);
}

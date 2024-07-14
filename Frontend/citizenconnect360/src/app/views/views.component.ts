import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-views',
  standalone: true,
  imports: [ RouterModule, CommonModule, FormsModule ],
  templateUrl: './views.component.html',
  styleUrl: './views.component.css'
})
export class ViewsComponent {
  views: string[] = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ];
  newView: string = '';

  addView() {
    if (this.newView.trim()) {
      this.views.push(this.newView);
      this.newView = '';
    }
  }

}

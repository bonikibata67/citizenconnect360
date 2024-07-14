import { Component } from '@angular/core';
import { Incident } from '../models/incedence';
import { CommonModule } from '@angular/common';
import { IncidentService } from '../services/incident.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.css'
})
// export class IncidentsComponent {

// }
export class IncidentsComponent {
  // incidents: Incident[] = [
  //   {
  //     title: 'Lorem Ipsum Incident',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //     imageUrl: 'https://via.placeholder.com/150' // Placeholder image URL
  //   },
  //   {
  //     title: 'Another Incident',
  //     description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  //     imageUrl: 'https://via.placeholder.com/150' // Placeholder image URL
  //   }
  // ];


  incidents: any[] = [];

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.incidentService.getIncidents().subscribe(incidents => {
      this.incidents = incidents;
    });
  }
}

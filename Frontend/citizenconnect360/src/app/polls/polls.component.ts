import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Poll, PollOption } from '../models/polls';
import { PollService } from '../services/poll.service';


@Component({
  selector: 'app-polls',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './polls.component.html',
  styleUrl: './polls.component.css'
})
// export class PollsComponent {

// }
export class PollsComponent implements OnInit{
  polls: Poll[] = [
    {
          title: 'Finance Bill, 2024',
          question: 'Are Kenyans for or against Finance Bill, 2024?',
          options: [
            { label: 'Yes', percentage: 8, votes: 8 },
            { label: 'No', percentage: 81, votes: 81 },
            { label: 'Not sure', percentage: 11, votes: 11 }
          ],
          totalVotes: 100
        },
        {
          title: 'Car Tax',
          question: '2.5% car tax?',
          options: [
            { label: 'Yes', percentage: 3, votes: 3 },
            { label: 'No', percentage: 87, votes: 87 },
            { label: 'Not sure', percentage: 10, votes: 10 }
          ],
          totalVotes: 100
        }
  ];

  constructor(private pollService: PollService) {}

  ngOnInit(): void {
    this.polls = this.pollService.getPolls();
    this.pollService.polls$.subscribe(polls => {
      this.polls = polls;
    });
  }

  deletePoll(index: number): void {
    this.pollService.deletePoll(index);
  }

  vote(poll: Poll, selectedOption: PollOption): void {
    selectedOption.votes++;
    poll.totalVotes++;

    poll.options.forEach(option => {
      option.percentage = Math.round((option.votes / poll.totalVotes) * 100);
    });
  }

  getColor(optionLabel: string): string {
    switch (optionLabel) {
      case 'Yes':
        return 'green';
      case 'No':
        return 'red';
      case 'Not sure':
        return 'yellow';
      default:
        return 'gray';
    }
  }
  
}
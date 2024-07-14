import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Poll, PollOption } from '../models/polls';
import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-createpoll',
  standalone: true,
  imports: [RouterModule, CommonModule,ReactiveFormsModule],
  templateUrl: './createpoll.component.html',
  styleUrls: ['./createpoll.component.css']
})
export class CreatepollComponent implements OnInit {
  pollForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pollService: PollService,
    private router: Router
  ) {
    this.pollForm = this.formBuilder.group({
      title: ['', Validators.required],
      question: ['', Validators.required],
      options: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {}

  get options(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  addPoll(): void {
    if (this.pollForm.valid) {
      const poll: Poll = {
        title: this.pollForm.value.title,
        question: this.pollForm.value.question,
        options: this.pollForm.value.options,
        totalVotes: 0
      };
      this.pollService.addPoll(poll);
      this.router.navigate(['/polls']); // Navigate to the polls page after adding poll
    }
  }

  addOption(): void {
    this.options.push(
      this.formBuilder.group({
        label: ['', Validators.required],
        percentage: [0],
        votes: [0]
      })
    );
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }
}

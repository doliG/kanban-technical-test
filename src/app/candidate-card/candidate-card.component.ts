import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from '../Candidate';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.sass']
})
export class CandidateCardComponent implements OnInit {
  @Input() candidate: Candidate;

  constructor() { }

  ngOnInit(): void {
  }

}

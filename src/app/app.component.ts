import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { candidateHaveTags, toCandidate, Candidate } from './Candidate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  candidates: Candidate[];
  availableTags: Set<string> = new Set();
  columns: {
    [name: string]: Candidate[];
  } = {};
  visibleItems = 15;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http
      .get('https://hiring.crew.work/v1/talents')
      .subscribe((res: Array<any>) => {
        this.candidates = res.map(toCandidate);
        this.computeColumns();
        for (let candidate of res) {
          for (let tag of candidate.tags) {
            this.availableTags.add(tag);
          }
        }
        this.cdr.markForCheck();
      });
  }

  computeColumns(tags?: string[]) {
    const filtered = (tags && tags.length)
      ? this.candidates.filter(candidate => candidateHaveTags(candidate, tags))
      : this.candidates;

    this.columns = filtered.reduce((acc, val) => {
      acc[val.stage]
        ? acc[val.stage].push(val)
        : (acc[val.stage] = [val]);
      return acc;
    }, {});
  }

  drop(event: CdkDragDrop<string[]>) {
    const { previousContainer, container, previousIndex, currentIndex } = event;

    // TODO: Make api Call to update Candidate
    previousContainer === container
      ? moveItemInArray(container.data, previousIndex, currentIndex)
      : transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
  }
}

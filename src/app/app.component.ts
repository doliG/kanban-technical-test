import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'kanban';

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

    console.log('computeColumns', tags, filtered.length);
    this.columns = filtered.reduce((acc, val) => {
      acc[val.stage]
        ? acc[val.stage].push(val)
        : (acc[val.stage] = [val]);
      return acc;
    }, {});
  }

  drop(event: CdkDragDrop<string[]>) {
    const { previousContainer, container, previousIndex, currentIndex } = event;
    if (previousContainer === container) {
      // TODO: Make api Call to update Candidate.position
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      // TODO: Make api Call to update Candidate.stage
      transferArrayItem(
        previousContainer.data,
        container.data,
        previousIndex,
        currentIndex
      );
    }
  }

  filter(tags: Set<string>) {
    Object.keys(this.columns).forEach(key => {
      this.columns[key] = this.columns[key].filter(candidate => {
        for (const tag of tags) {
          if (candidate.tags.has(tag)) {
            return true;
          }
        }
        return false;
      })
    })
  }
}

function toCandidate(apiCandidate): Candidate {
  return {
    ...apiCandidate,
    tags: new Set(apiCandidate.tags),
  };
}

function candidateHaveTags(candidate: Candidate, tags: string[]) {
  for (const tag of tags) {
    if (candidate.tags.has(tag)) {
      return true;
    }
  }
  return false;
}

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  job: string;
  location: string;
  linkedin: string;
  github: string;
  twitter: string;
  tags: Set<string>;
  stage: string;
}

import { Component, OnInit } from '@angular/core';
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
})
export class AppComponent implements OnInit {
  title = 'kanban';

  columns: {
    [name: string]: Candidate[];
  };
  tags: Set<string> = new Set();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('https://hiring.crew.work/v1/talents')
      .subscribe((res: Array<any>) => {
        console.time('process time');
        this.columns = res.reduce((acc, val) => {
          acc[val.stage]
            ? acc[val.stage].push(toCandidate(val))
            : (acc[val.stage] = [toCandidate(val)]);
          return acc;
        }, {});
        // Object.keys(this.columns).forEach((key) => {
          // this.columns[key] = this.columns[key].slice(0, 10);
        // });
        for (let candidate of res) {
          for (let tag of candidate.tags) {
            this.tags.add(tag);
          }
        }
        console.timeEnd('process time');
        console.log(this.columns);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    const { previousContainer, container, previousIndex, currentIndex } = event;
    console.log(event);
    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(
        previousContainer.data,
        container.data,
        previousIndex,
        currentIndex
      );
    }
  }
}

function toCandidate(apiCandidate): Candidate {
  return {
    ...apiCandidate,
    tags: new Set(apiCandidate.tags),
  };
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

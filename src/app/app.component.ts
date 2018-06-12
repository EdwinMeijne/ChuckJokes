import { Component } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {JokeState} from './ngxs/joke.actions';
import {Joke} from './app.types';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
      <app-joke-fetch-button></app-joke-fetch-button>
      <app-joke-list [jokes]="jokes$ | async"></app-joke-list>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @Select(JokeState.jokes) jokes$: Observable<Joke[]>;

    constructor(
        private store: Store,
    ) {}
}

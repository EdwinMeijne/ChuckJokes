import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AddFavourite, JokeState, RemoveFavourite} from './ngxs/joke.actions';
import {Joke} from './app.types';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
      <app-joke-fetch-button></app-joke-fetch-button>
      <app-joke-list [jokes]="jokes$ | async" (jokeClicked)="markFavourite($event)"></app-joke-list>
      <app-joke-list [jokes]="favourites$ | async" (jokeClicked)="removeFavourite($event)"></app-joke-list>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @Select(JokeState.jokes) jokes$: Observable<Joke[]>;
    @Select(JokeState.favourites) favourites$: Observable<Joke[]>;

    constructor(
        private store: Store,
    ) {}

    markFavourite(joke) {
        this.store.dispatch(new AddFavourite(joke));
    }

    removeFavourite(joke) {
        this.store.dispatch(new RemoveFavourite(joke));
    }
}

import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ToggleFavourite, JokeState, SetAutoAdd} from './ngxs/joke.actions';
import {EMPTY, interval} from 'rxjs';
import {distinctUntilKeyChanged, filter, finalize, mergeMap, switchMap, takeUntil, tap} from 'rxjs/internal/operators';
import {JokeService} from './joke.service';

@Component({
  selector: 'app-root',
  template: `
      <app-login-box></app-login-box>
      <app-joke-fetch-button></app-joke-fetch-button>
      <app-dispatch-timer-toggle></app-dispatch-timer-toggle>
      <app-joke-list [jokes]="jokes$ | async" (jokeClicked)="toggleFavourite($event)"></app-joke-list>
      <app-joke-list [jokes]="favourites$ | async" (jokeClicked)="toggleFavourite($event)"></app-joke-list>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @Select(JokeState.jokes) jokes$;
    @Select(JokeState.favourites) favourites$;
    @Select(JokeState.autoAdd) autoAdd$;

    constructor(
        private store: Store,
        private jokeService: JokeService,
    ) {
        this.autoAdd$.pipe(
            distinctUntilKeyChanged('active'),
            switchMap(({active}) => active ? interval(5000).pipe(
                takeUntil(this.store.select(JokeState.favouritesFull).pipe(filter(full => full))),
                mergeMap(() => this.jokeService.fetchJokes(1).pipe(
                    tap(joke => this.store.dispatch(new ToggleFavourite(joke[0]))),
                    // TODO: Note that if a favourite is already a in the list, it will be removed..
                )),
                finalize(() => void this.store.dispatch(new SetAutoAdd(false))),
            ) : EMPTY),
        ).subscribe(); // no need to unsubscribe in app.component
    }

    toggleFavourite(joke) {
        this.store.dispatch(new ToggleFavourite(joke));
    }
}

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngxs/store';
import {FetchRandomJokes} from '../ngxs/joke.actions';

@Component({
    selector: 'app-joke-fetch-button',
    template: `
        <button (click)="fetchJokes()">Fetch Jokes</button>
    `,
    styleUrls: ['./joke-fetch-button.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeFetchButtonComponent {

    constructor(
        private store: Store,
    ) {}

    fetchJokes() {
        this.store.dispatch(new FetchRandomJokes(10));
    }
}

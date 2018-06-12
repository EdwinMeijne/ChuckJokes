import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Joke} from '../app.types';

@Component({
    selector: 'app-joke-list',
    template: `
        <ul>
            <li *ngFor="let joke of jokes">
                {{joke.id}} - {{joke.joke}}
            </li>
        </ul>
    `,
    styleUrls: ['./joke-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeListComponent {
    @Input() jokes: Joke[];

    constructor() {}
}

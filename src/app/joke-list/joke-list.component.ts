import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Joke} from '../app.types';

@Component({
    selector: 'app-joke-list',
    template: `
        <ul>
            <li class="joke" *ngFor="let joke of jokes" (click)="jokeClicked.emit(joke.joke)" [class.joke--favourite]="joke.isFavourite">
                {{joke.joke}}
            </li>
        </ul>
    `,
    styles: [`
        .joke {
            list-style: none;
        }

        .joke--favourite {
            background-color: green;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeListComponent {
    @Input() jokes: Joke[];
    @Output() jokeClicked: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}
}

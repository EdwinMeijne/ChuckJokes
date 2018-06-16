import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {JokeState, SetAutoAdd} from '../ngxs/joke.actions';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-dispatch-timer-toggle',
    template: `
        <ng-container *ngIf="autoAdd$ | async as autoAdd">
            <button (click)="setAutoAdd(!autoAdd.active)">
                {{autoAdd.active ? 'Cancel AutoAdd' : 'Activate AutoAdd'}}
            </button>
        </ng-container>
    `,
    styleUrls: ['./dispatch-timer-toggle.component.css'],
})
export class DispatchTimerToggleComponent {
    @Select(JokeState.autoAdd) autoAdd$: Observable<{active: boolean}>;

    constructor(
        private store: Store,
    ) {}

    setAutoAdd(state: boolean) {
        this.store.dispatch(new SetAutoAdd(state));
    }
}

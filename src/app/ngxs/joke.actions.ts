import {Action, Selector, State, StateContext} from '@ngxs/store';
import {JokeService} from '../joke.service';
import {tap} from 'rxjs/operators';
import {Joke} from '../app.types';

export class FetchRandomJokes {
    static readonly type = '[Jokes] Fetch';

    constructor(public amount: number) {
    }
}

interface JokeStateModel {
    jokes: Joke[];
    favourites: Joke[];
}

@State<JokeStateModel>({
    name: 'jokes',
    defaults: {
        jokes: [],
        favourites: [],
    },
})
export class JokeState {
    constructor(private jokeService: JokeService) {}

    @Selector() static jokes(state: JokeStateModel) {
        return state.jokes;
    }

    @Selector() static favourites(state: JokeStateModel) {
        return state.favourites;
    }

    @Action(FetchRandomJokes, { cancelUncompleted: true }) // the call cancels when clicked again before complete
    fetchRndStart(ctx: StateContext<JokeStateModel>, {amount}: FetchRandomJokes) {
        return this.jokeService.fetchJokes(amount)
            .pipe(tap(jokes => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    jokes,
                });
            }));
    }
}

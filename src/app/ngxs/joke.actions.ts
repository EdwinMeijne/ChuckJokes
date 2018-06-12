import {Action, Selector, State, StateContext} from '@ngxs/store';
import {JokeService} from '../joke.service';
import {tap} from 'rxjs/operators';
import {Joke} from '../app.types';

export class FetchRandomJokes {
    static readonly type = '[Jokes] Fetch';

    constructor(public amount: number) {
    }
}

export class AddFavourite {
    static readonly type = '[Jokes] Add Favourite';

    constructor(public joke: string) {
    }
}

export class RemoveFavourite {
    static readonly type = '[Jokes] Remove Favourite';

    constructor(public joke: string) {
    }
}

interface JokeStateModel {
    jokes: string[];
    favourites: string[];
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

    @Selector() static jokes(state: JokeStateModel): Joke[] {
        return state.jokes.map(joke => ({
            joke,
            isFavourite: state.favourites.indexOf(joke) !== -1,
        }));
    }

    @Selector() static favourites(state: JokeStateModel): Joke[] {
        return state.favourites.map(joke => ({joke, isFavourite: true}));
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

    @Action(AddFavourite)
    addFavourite(ctx: StateContext<JokeStateModel>, {joke}: AddFavourite) {
        const state = ctx.getState();
        if (state.favourites.indexOf(joke) === -1) {
            ctx.setState({
                ...state,
                favourites: [...state.favourites, joke].slice(-10), // restrict size of favourite list
            });
        }
    }

    @Action(RemoveFavourite)
    removeFavourite(ctx: StateContext<JokeStateModel>, {joke}: RemoveFavourite) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            favourites: state.favourites.filter(favourite => favourite !== joke),
        });
    }

}

import {Action, Selector, State, StateContext} from '@ngxs/store';
import {JokeService} from '../joke.service';
import {tap} from 'rxjs/operators';
import {Joke} from '../app.types';

export class FetchRandomJokes {
    static readonly type = '[Jokes] Fetch';

    constructor(public amount: number) {
    }
}

export class ToggleFavourite {
    static readonly type = '[Jokes] Toggle Favourite';

    constructor(public joke: string) {
    }
}

export class SetAutoAdd {
    static readonly type = '[Jokes] Set Auto Add';

    constructor(public active: boolean) {
    }
}

const FAVOURITE_MAX_SIZE = 10;

interface JokeStateModel {
    jokes: string[];
    favourites: string[];
    autoAdd: boolean;
}

@State<JokeStateModel>({
    name: 'jokes',
    defaults: {
        jokes: [],
        favourites: [],
        autoAdd: false,
    },
})
export class JokeState {
    constructor(
        private jokeService: JokeService
    ) {}

    @Selector()
    static jokes(state: JokeStateModel): Joke[] {
        return state.jokes.map(joke => ({
            joke,
            isFavourite: state.favourites.indexOf(joke) !== -1,
        }));
    }

    @Selector()
    static favourites(state: JokeStateModel): Joke[] {
        return state.favourites.map(joke => ({joke, isFavourite: true}));
    }

    @Selector()
    static favouritesFull(state: JokeStateModel): boolean {
        return state.favourites.length >= FAVOURITE_MAX_SIZE;
    }

    @Selector()
    static autoAdd(state: JokeStateModel): { active: boolean } {
        return {active: state.autoAdd};
    }

    @Action(FetchRandomJokes, {cancelUncompleted: true}) // the call cancels when clicked again before complete
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

    @Action(ToggleFavourite)
    toggleFavourite(ctx: StateContext<JokeStateModel>, {joke}: ToggleFavourite) {
        const state = ctx.getState();
        if (state.favourites.indexOf(joke) === -1) {
            ctx.setState({
                ...state,
                favourites: [...state.favourites, joke].slice(-FAVOURITE_MAX_SIZE), // restrict size of favourite list
            });
        } else {
            ctx.setState({
                ...state,
                favourites: state.favourites.filter(favourite => favourite !== joke),
            });
        }
    }

    @Action(SetAutoAdd)
    setAutoAdd(ctx: StateContext<JokeStateModel>, {active}: SetAutoAdd) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            autoAdd: active,
        });
    }
}

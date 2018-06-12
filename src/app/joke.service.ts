import {Injectable} from '@angular/core';
import {Joke} from './app.types';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JokeService {

    constructor(private http: HttpClient, ) {
    }

    fetchJokes(amount: number = 10): Observable<Joke[]> {
        return this.http.get<ApiResponse>(environment.api + amount)
            .pipe(
                map(({value}) => {
                    if (value && value.length > 0) {
                        return value.map(entry => ({
                            id: entry.id,
                            joke: entry.joke
                        }));
                    } else {
                        return [];
                    }
                }),
            );
    }
}

interface ApiResponse {
    type: string;
    value: {
        id: number;
        joke: string;
    }[];
}

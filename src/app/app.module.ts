import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {JokeListComponent} from './joke-list/joke-list.component';
import {JokeFetchButtonComponent} from './joke-fetch-button/joke-fetch-button.component';
import {NgxsModule} from '@ngxs/store';
import {JokeState} from './ngxs/joke.actions';
import {HttpClientModule} from '@angular/common/http';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';

@NgModule({
    declarations: [
        AppComponent,
        JokeListComponent,
        JokeFetchButtonComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgxsModule.forRoot([
            JokeState,
        ]),
        NgxsStoragePluginModule.forRoot({key: 'jokes.favourites'}),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {JokeListComponent} from './joke-list/joke-list.component';
import {JokeFetchButtonComponent} from './joke-fetch-button/joke-fetch-button.component';
import {NgxsModule} from '@ngxs/store';
import {JokeState} from './ngxs/joke.actions';
import {HttpClientModule} from '@angular/common/http';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

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
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {alphaSequenceValidator} from './alpha-sequence.validator';
import {forbiddenCharactersValidator} from './forbidden-characters.validator';
import {alphaDuplicateValidator} from './alpha-duplicates.validator';

@Component({
    selector: 'app-login-box',
    template: `
        <form [formGroup]="login">
            <ul>
                <li>
                    <label>
                        <h2>Username:</h2>
                        <input formControlName="username" type="text">
                    </label>
                    {{username.errors | json}}
                    <ul class="requirements" [class.requirements--dirty]="username.dirty">
                        <li [class.requirements--invalid]="username.errors?.pattern">
                            Username needs to be between 3-32 characters.
                        </li>
                    </ul>
                </li>
                <li>
                    <label>
                        <h2>Password:</h2>
                        <input formControlName="password" type="password">
                    </label>
                    <ul class="requirements" [class.requirements--dirty]="password.dirty">
                        <li [class.requirements--invalid]="password.errors?.pattern">
                            Password can only be lowercase alpha characters and needs to be between 3-32 characters.
                        </li>
                        <li [class.requirements--invalid]="password.errors?.forbiddenChar">
                            Passwords may not contain the letters i, O, or l,
                            as these letters can be mistaken for other characters and are therefore confusing.
                        </li>
                        <li [class.requirements--invalid]="password.errors?.alphaSequence">
                            Passwords must include one increasing straight of at least three letters,
                            like abc, cde, fgh, and so on, up to xyz.
                        </li>
                        <li [class.requirements--invalid]="password.errors?.alphaDuplicate">
                            Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc.
                        </li>
                    </ul>
                </li>
            </ul>
        </form>
    `,
    styleUrls: ['./login-box.component.scss'],
})
export class LoginBoxComponent implements OnInit {
    login: FormGroup;

    constructor(private fb: FormBuilder) {
        this.login = this.fb.group({
            username: ['', [
                Validators.required,
                Validators.pattern(/^.{3,32}$/),
            ]],
            password: ['', [
                Validators.required,
                Validators.pattern(/^[a-z]{3,32}$/),
                forbiddenCharactersValidator(['i', 'O', 'l']), // Could also be done with regex, but this is more fun
                alphaSequenceValidator(),
                alphaDuplicateValidator(),
            ]],
        });
    }

    ngOnInit() {
    }

    get username() {
        return this.login.get('username');
    }

    get password() {
        return this.login.get('password');
    }
}

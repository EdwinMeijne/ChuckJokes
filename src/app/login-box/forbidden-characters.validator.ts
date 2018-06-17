import {AbstractControl, ValidatorFn} from '@angular/forms';

export function forbiddenCharactersValidator(forbiddenChars: string[]): ValidatorFn {
    return ({value}: AbstractControl): {[key: string]: any} | null => {
        return forbiddenChars.every((forbiddenChar) => !value.includes(forbiddenChar)) ? null : {'forbiddenChar': {}};
    };
}

import {AbstractControl, ValidatorFn} from '@angular/forms';
import {getNrOfAlphabet} from './utils';

export function alphaDuplicateValidator(): ValidatorFn {
    return ({value}: AbstractControl): {[key: string]: any} | null => {
        if (!value) { return null; }
        const valueArr = value.split('');
        return valueArr.filter((val, index, arr) => {
            const currentNr = getNrOfAlphabet(arr[index]);
            return getNrOfAlphabet(arr[index + 1]) === currentNr && getNrOfAlphabet(arr[index - 1]) !== currentNr;
        }).length >= 2 && valueArr.length >= 4 ? null : {'alphaDuplicate': {}};
    };
}

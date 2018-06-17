import {AbstractControl, ValidatorFn} from '@angular/forms';
import {getNrOfAlphabet} from './utils';

export function alphaSequenceValidator(): ValidatorFn {
    return ({value}: AbstractControl): {[key: string]: any} | null => {
        if (!value) { return null; }
        const valueArr = value.split('');
        return valueArr.some((val, index, arr) => {
            const currentNr = getNrOfAlphabet(arr[index]);
            return getNrOfAlphabet(arr[index + 1]) === currentNr + 1
                && getNrOfAlphabet(arr[index + 2]) === currentNr + 2;
        }) && valueArr.length >= 3 ? null : {'alphaSequence': {}};
    };
}

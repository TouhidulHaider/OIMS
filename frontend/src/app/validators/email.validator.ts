import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(emailControl: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const email = control.get(emailControl);

        if (!email) {
            return null;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailPattern.test(email.value);

        return !isValidEmail ? { invalidEmail: true } : null;
    };
}


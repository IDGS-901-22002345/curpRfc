import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static curpValidator(control: AbstractControl): ValidationErrors | null {
    const curp = control.value?.toUpperCase();
    if (!curp) return null;

    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z]{3}\d{2}$/;
    if (!curpRegex.test(curp)) {
      return { invalidFormat: true };
    }

    // Lista de entidades federativas válidas
    const entidades = [
      'AS', 'BC', 'BS', 'CC', 'CL', 'CM', 'CS', 'CH', 'DF', 'DG',
      'GT', 'GR', 'HG', 'JC', 'MC', 'MN', 'MS', 'NT', 'NL', 'OC',
      'PL', 'QT', 'QR', 'SP', 'SL', 'SR', 'TC', 'TS', 'TL', 'VZ',
      'YN', 'ZS', 'NE'
    ];

    const estado = curp.substring(11, 13);
    if (!entidades.includes(estado)) {
      return { invalidStateCode: true };
    }

    const yearStr = curp.substring(4, 6);
    const monthStr = curp.substring(6, 8);
    const dayStr = curp.substring(8, 10);

    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return { invalidDate: true };
    }

    const currentYear = new Date().getFullYear() % 100;
    let fullYear = 1900 + year;
    if (year <= currentYear) fullYear = 2000 + year;

    if (fullYear > 2025) {
      return { invalidYear: true };
    }
    if (month < 1 || month > 12) {
      return { invalidMonth: true };
    }

    const daysInMonth = new Date(fullYear, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return { invalidDay: true };
    }

    return null;
  }

  static rfcValidator(control: AbstractControl): ValidationErrors | null {
    const rfc = control.value?.toUpperCase();
    if (!rfc) return null;

    const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/;
    if (!rfcRegex.test(rfc)) {
      return { invalidFormat: true };
    }

    const yearStr = rfc.substring(3, 5);
    const monthStr = rfc.substring(5, 7);
    const dayStr = rfc.substring(7, 9);

    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return { invalidDate: true };
    }

    const currentYear = new Date().getFullYear() % 100;
    let fullYear = 1900 + year;
    if (year <= currentYear) fullYear = 2000 + year;

    if (fullYear > 2025) {
      return { invalidYear: true };
    }
    if (month < 1 || month > 12) {
      return { invalidMonth: true };
    }

    const daysInMonth = new Date(fullYear, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return { invalidDay: true };
    }

    return null;
  }
}

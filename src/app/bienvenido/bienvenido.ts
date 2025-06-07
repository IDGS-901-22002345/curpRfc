import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomValidators } from './validators';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bienvenido.html',
  styleUrls: ['./bienvenido.css']
})
export class Bienvenido {
  form: FormGroup;
  curpMessage = '';
  rfcMessage = '';
  matchMessage = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      curp: ['', Validators.required],
      rfc: ['', Validators.required]
    });

    // Limpiar mensajes cuando el usuario modifica los campos
    this.form.get('curp')?.valueChanges.subscribe(() => {
      this.curpMessage = '';
      this.matchMessage = '';
    });

    this.form.get('rfc')?.valueChanges.subscribe(() => {
      this.rfcMessage = '';
      this.matchMessage = '';
    });
  }

  validarCURP() {
    const control = this.form.get('curp');
    if (!control) return;

    const valueUpper = control.value?.toUpperCase() || '';
    control.setValue(valueUpper, { emitEvent: false });

    control.setValidators([Validators.required, CustomValidators.curpValidator]);
    control.updateValueAndValidity();

    this.curpMessage = control.valid
      ? 'CURP válido y con formato correcto.'
      : 'CURP inválido. Revisa el formato.';
  }

  validarRFC() {
    const control = this.form.get('rfc');
    if (!control) return;

    const valueUpper = control.value?.toUpperCase() || '';
    control.setValue(valueUpper, { emitEvent: false });

    control.setValidators([Validators.required, CustomValidators.rfcValidator]);
    control.updateValueAndValidity();

    this.rfcMessage = control.valid
      ? 'RFC válido y con formato correcto.'
      : 'RFC inválido. Revisa el formato.';
  }

  comprobarCoincidencia() {
    const curp = this.form.value.curp?.toUpperCase().slice(0, 10);
    const rfc = this.form.value.rfc?.toUpperCase().slice(0, 10);
    this.matchMessage = curp === rfc
      ? 'Coinciden los primeros 10 caracteres.'
      : 'No coinciden los primeros 10 caracteres.';
  }
}

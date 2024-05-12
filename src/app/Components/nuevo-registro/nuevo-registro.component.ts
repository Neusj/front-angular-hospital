import { Component, Input, OnInit, inject, input } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PacienteService } from '../../Services/paciente.service';
import { Router } from '@angular/router';
import { Paciente } from '../../Models/Paciente';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-nuevo-registro',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatMomentDateModule,
    CommonModule
  ],

  templateUrl: './nuevo-registro.component.html',
  styleUrl: './nuevo-registro.component.css'
})
export class NuevoRegistroComponent implements OnInit{

  private pacienteServicio = inject(PacienteService);

  public formPaciente:FormGroup = this.formBuild.group({
    rut: [''],
    nombre: [''],
    edad: 0,
    sexo: [''],
    fotoPersonal: [''],
    fechaIngreso: [''],
    enfermedad: [''],
    revisado: false,
  })

  constructor(private router: Router, private formBuild: FormBuilder) { }

  ngOnInit(): void {
    this.formPaciente = this.formBuild.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      edad: [null, Validators.required],
      sexo: ['', Validators.required],
      fotoPersonal: [''],
      fechaIngreso: [''],
      enfermedad: ['', Validators.required],
      revisado: [false, Validators.required]
    });
  }

  save(){
      if (this.formPaciente.invalid) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
      } 

      const obj: Paciente = {
        rut: this.formPaciente.value.rut,
        nombre: this.formPaciente.value.nombre,
        edad: this.formPaciente.value.edad,
        sexo: this.formPaciente.value.sexo,
        fotoPersonal: this.formPaciente.value.fotoPersonal,
        fechaIngreso: this.formPaciente.value.fechaIngreso,
        enfermedad: this.formPaciente.value.enfermedad,
        revisado: this.formPaciente.value.revisado,
      }

      this.pacienteServicio.create(obj).subscribe({
        next:() => {
          this.router.navigate(['/']);
        },
        error:(err)=>{
          console.log(err.message);
        }
      })
  }

  volver(){
    this.router.navigate(['/']);
  }

}

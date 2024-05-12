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
  selector: 'app-actualizar-registro',
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
  templateUrl: './actualizar-registro.component.html',
  styleUrl: './actualizar-registro.component.css'
})
export class ActualizarRegistroComponent implements OnInit{

  @Input('id') idPaciente: string = '0';
  private pacienteServicio = inject(PacienteService);
  public formBuild = inject(FormBuilder);

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

  constructor(private router:Router){}
  
  ngOnInit():void{
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


      this.pacienteServicio.get_by_id(this.idPaciente).subscribe({
        next:(data) => {
          const pre_json_data = JSON.stringify(data);
          const json_data = JSON.parse(pre_json_data);
          
          this.formPaciente.patchValue({
            rut: json_data.paciente.rut,
            nombre: json_data.paciente.nombre,
            edad: json_data.paciente.edad,
            sexo: json_data.paciente.sexo,
            fotoPersonal: json_data.paciente.fotoPersonal,
            fechaIngreso: json_data.paciente.fechaIngreso,
            enfermedad: json_data.paciente.enfermedad,
            revisado: json_data.paciente.revisado,
          })
        },
        error:(err)=>{
          console.log(err.message);
        }
      })
  }

  save(){
    if (this.formPaciente.invalid) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

      const obj: Paciente = {
        _id: this.idPaciente,
        rut: this.formPaciente.value.rut,
        nombre: this.formPaciente.value.nombre,
        edad: this.formPaciente.value.edad,
        sexo: this.formPaciente.value.sexo,
        fotoPersonal: this.formPaciente.value.fotoPersonal,
        fechaIngreso: this.formPaciente.value.fechaIngreso,
        enfermedad: this.formPaciente.value.enfermedad,
        revisado: this.formPaciente.value.revisado,
      }      
      this.pacienteServicio.update(obj).subscribe({
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


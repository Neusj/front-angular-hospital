import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../Services/paciente.service';
import { Paciente } from '../../Models/Paciente';

@Component({
  selector: 'app-buqueda-registros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buqueda-registros.component.html',
  styleUrl: './buqueda-registros.component.css'
})
export class BuquedaRegistrosComponent implements OnInit{
  private paciente_service = inject(PacienteService);
  public lista_pacientes:Paciente[] = [];
  sexo: string = '';
  fechaIngreso: Date | null = null;
  enfermedad: string = '';

  ngOnInit(): void {}

  constructor(private router: Router) { }

  search(): void {
    let queryParams: string = '';

    if (this.sexo) {
      queryParams = `/?${queryParams}sexo=${this.sexo}`;
    }

    if (this.fechaIngreso) {
      queryParams = `/?${queryParams}fechaIngreso=${this.fechaIngreso.toISOString()}`;
    }

    if (this.enfermedad) {
      queryParams = `/?${queryParams}enfermedad=${this.enfermedad}`;
    }

    this.paciente_service.get_custom(queryParams).subscribe({
      next:(data) => {
        if (data.length > 0){
          this.lista_pacientes = data;
        }
      },
      error:(err) => {
        console.log(err.message);
      }
    })
  }
}

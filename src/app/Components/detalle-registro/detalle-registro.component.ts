import { Component, Input, OnInit, inject } from '@angular/core';
import { PacienteService } from '../../Services/paciente.service';
import { Router } from '@angular/router';
import { Paciente } from '../../Models/Paciente';

@Component({
  selector: 'app-detalle-registro',
  standalone: true,
  imports: [],
  templateUrl: './detalle-registro.component.html',
  styleUrl: './detalle-registro.component.css'
})
export class DetalleRegistroComponent implements OnInit{
  @Input('id') idPaciente: string = '0';
  private pacienteServicio = inject(PacienteService);
  public paciente: Paciente = {
    rut: '',
    nombre: '',
    edad: 0,
    sexo: '',
    fotoPersonal: '',
    fechaIngreso: new Date(),
    enfermedad: '',
    revisado: false,
  };

  constructor(private router:Router){}
  ngOnInit(): void {
    this.pacienteServicio.get_by_id(this.idPaciente).subscribe({
      next:(data) => {
        const pre_json_data = JSON.stringify(data);
        const json_data = JSON.parse(pre_json_data);
        console.log(data);
        
        this.paciente = json_data.paciente;

      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  editarPaciente(id:string | undefined) {
    this.router.navigate(['/registro/actualizar', id])
  }

  eliminarPaciente(id:string | undefined) {
    if(confirm('Desea eliminar al paciente ')){
      const idPaciente = id ? id : '';
      this.pacienteServicio.delete(idPaciente).subscribe({
        next:(data) => {
          this.router.navigate(['/']);
          
        },
        error:(err) => {
          console.log(err.message);
        }
      })
    }
  }
  volver(){
    this.router.navigate(['/']);
  }

}

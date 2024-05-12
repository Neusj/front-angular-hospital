import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Hospital El Alerce';

  constructor(private router:Router){}

  crear_paciente(){
    this.router.navigate(['/registro/nuevo']);
  }
  
  listar_todos(){
    this.router.navigate(['/registro/listar-todos']);
  }

  buscar_personalizada(){
    this.router.navigate(['/registro/busqueda']);
  }

  volver(){
    this.router.navigate(['/']);
  }
}

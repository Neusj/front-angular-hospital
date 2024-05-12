import { Routes } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { NuevoRegistroComponent } from './Components/nuevo-registro/nuevo-registro.component';
import { ActualizarRegistroComponent } from './Components/actualizar-registro/actualizar-registro.component';
import { ListarRegistros } from './Components/listar-registros/listar-registros.component';
import { BuquedaRegistrosComponent } from './Components/buqueda-registros/buqueda-registros.component';
import { DetalleRegistroComponent } from './Components/detalle-registro/detalle-registro.component';

export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'home', component:InicioComponent},
    {path:'registro/nuevo', component:NuevoRegistroComponent},
    {path:'registro/busqueda', component:BuquedaRegistrosComponent},
    {path:'registro/detalle/:id', component:DetalleRegistroComponent},
    {path:'registro/actualizar/:id', component:ActualizarRegistroComponent},
    {path:'registro/listar-todos', component:ListarRegistros},
];

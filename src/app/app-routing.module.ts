import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPersonaComponent } from './vistas/persona/editar-persona/editar-persona.component';
import { PersonaComponent } from './vistas/persona/persona.component';

const routes: Routes = [
  { path:'', redirectTo:'personas', pathMatch:'full' },
  { path:'personas', component:PersonaComponent },
  { path:'editarPersonas/:id', component:EditarPersonaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

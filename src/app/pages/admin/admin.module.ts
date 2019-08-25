import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { Routes, RouterModule } from "@angular/router";
import { NgZorroAntdModule } from "ng-zorro-antd";

const routes: Routes = [
  { path: "", component: UsuariosComponent },
  { path: "usuarios", component: UsuariosComponent }
];

@NgModule({
  declarations: [UsuariosComponent],
  imports: [CommonModule, NgZorroAntdModule, RouterModule.forChild(routes)]
})
export class AdminModule {}

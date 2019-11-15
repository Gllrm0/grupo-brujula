import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { LoginComponent } from "./pages/landing/login/login.component";
import { RegisterComponent } from "./pages/landing/register/register.component";
import { ContentComponent } from "./pages/landing/content/content.component";
import { UsuariosComponent } from "./pages/admin/usuarios/usuarios.component";
import { ProductosComponent } from "./pages/admin/productos/productos.component";
import { ProductoFormComponent } from "./pages/admin/productos/producto-form/producto-form.component";
import { AdminGuard } from "./pages/admin/admin.guard";
import { GaleriaComponent } from "./pages/landing/galeria/galeria.component";
import { QuienesSomosComponent } from "./pages/landing/quienes-somos/quienes-somos.component";
import { MensajesComponent } from "./pages/admin/mensajes/mensajes.component";
import { GaleriaUploadComponent } from "./pages/admin/galeria-upload/galeria-upload.component";
import { GaleriaAdminComponent } from "./pages/admin/galeria-admin/galeria-admin.component";
import { PublicidadComponent } from "./pages/admin/publicidad/publicidad.component";

const routes: Routes = [
  // { path: "", pathMatch: "full", redirectTo: "/app" },
  {
    path: "",
    component: LandingComponent,
    children: [
      { path: "", component: ContentComponent },
      { path: "login", component: LoginComponent },
      { path: "registro", component: RegisterComponent },
      { path: "galeria", component: GaleriaAdminComponent },
      { path: "quienes-somos", component: QuienesSomosComponent }
    ]
  },
  {
    path: "app",
    component: AppComponent,
    canActivate: [AdminGuard],
    children: [
      { path: "", component: UsuariosComponent },
      { path: "usuarios", component: UsuariosComponent },
      { path: "mensajes", component: MensajesComponent },
      { path: "publicidad", component: PublicidadComponent },
      {
        path: "galeria",
        children: [
          { path: "", component: GaleriaAdminComponent },
          { path: "upload", component: GaleriaUploadComponent }
        ]
      },
      {
        path: "productos",
        children: [
          { path: "", component: ProductosComponent },
          { path: "add", component: ProductoFormComponent },
          { path: ":id", component: ProductoFormComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

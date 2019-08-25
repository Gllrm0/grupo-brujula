import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./pages/landing/landing.component";

const routes: Routes = [
  // { path: "", pathMatch: "full", redirectTo: "/app" },
  { path: "", component: LandingComponent },
  {
    path: "app",
    component: AppComponent,
    loadChildren: () =>
      import("./pages/admin/admin.module").then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

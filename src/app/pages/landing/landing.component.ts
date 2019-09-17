import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from "../admin/usuarios/usuario.service";
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}
  ngOnInit() {}
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl("/");
  }
}

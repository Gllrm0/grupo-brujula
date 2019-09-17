import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { switchMap, take, map } from "rxjs/operators";
import { UsuarioService } from "./usuarios/usuario.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log("guard");
    return this.usuarioService.isAdmin().pipe(
      take(1),
      map(isAdmin => {
        if (!isAdmin) {
          console.log();

          this.router.navigateByUrl("/");
          return false;
        }
        return true;
      })
    );
  }
}

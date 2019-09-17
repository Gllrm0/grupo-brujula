import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { MensajesService } from "./pages/admin/mensajes/mensajes.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  isCollapsed = false;
  messagesCounter$: Observable<number>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private mensajeService: MensajesService
  ) {
    this.messagesCounter$ = this.mensajeService.getUnreadMessages();
  }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl("/");
  }
}

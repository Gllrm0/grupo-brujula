import { Injectable } from "@angular/core";
import { Usuario } from "./usuario";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuarios: Observable<any[]>;
  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private modalService: NzModalService
  ) {}

  list(): Observable<Usuario[]> {
    return this.db
      .collection<Usuario>("usuarios")
      .snapshotChanges()
      .pipe(
        map(snaps => {
          return snaps.map(snap => {
            return <Usuario>{
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            };
          });
        })
      );
  }

  cambiarEstado(usuario) {
    const id = usuario.id;
    const estado = usuario.activo;
    this.db.doc(`usuarios/${id}`).update({ activo: !estado });
  }

  getUserByUsername(username: string) {
    const user = username.toLocaleLowerCase().trim();

    return this.db
      .collection("usuarios")
      .ref.where("username", "==", user)
      .get()
      .then(snapshot => {
        if (snapshot.empty) return undefined;
        return snapshot.docs[0].data();
      });
  }

  getUserByEmail(email: string) {
    const user = email.toLocaleLowerCase().trim();
    return this.db
      .collection("usuarios")
      .ref.where("email", "==", user)
      .get()
      .then(snapshot => {
        if (snapshot.empty) return undefined;
        return snapshot.docs[0].data();
      });
  }

  async addUser(user) {
    const email = user.email.toLowerCase().trim();
    const newUser = {
      ...user,
      activo: true,
      isAdmin: false,
      email
    };
    await this.fireAuth.auth.createUserWithEmailAndPassword(
      email,
      newUser.password
    );
    delete newUser.confirm;
    delete newUser.password;
    console.log(newUser);

    return this.db.collection("usuarios").add(newUser);
  }

  login({ email, password }) {
    this.fireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.getUserByEmail(user.user.email).then(user => {
          console.log(user);

          if (user.activo) {
            this.router.navigateByUrl("/");
          } else {
            this.modalService.error({
              nzTitle: "Cuenta suspendida",
              nzContent: `Esta cuenta ha sido desahabilitada, contacta al administrador para conocer mas detalles. <code> admin@grupo-brujula.com</code>`
            });
            this.fireAuth.auth.signOut();
          }
        });
      });
  }

  isAdmin() {
    return this.fireAuth.authState.pipe(
      switchMap(state => this.getUserByEmail(state.email)),
      map(user => {
        console.log(user);

        return <boolean>user.isAdmin;
      })
    );
  }
}

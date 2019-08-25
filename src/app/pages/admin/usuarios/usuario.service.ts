import { Injectable } from "@angular/core";
import { Usuario } from "./usuario";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuarios: Observable<any[]>;
  constructor(private db: AngularFirestore) {}

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
}

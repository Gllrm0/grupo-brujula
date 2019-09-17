import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Mensaje } from "./mensaje";

@Injectable({
  providedIn: "root"
})
export class MensajesService {
  constructor(private db: AngularFirestore) {}

  private mensajesRef = this.db.collection("compras");

  getMessages() {
    return this.mensajesRef.ref
      .orderBy("fecha", "desc")
      .get()
      .then(snap => {
        return snap.docs.map(mensaje => {
          return <Mensaje>{
            id: mensaje.id,
            ...mensaje.data(),
            fecha: mensaje.get("fecha").toDate()
          };
        });
      });
  }

  markAsRead(id: string, isRead = true) {
    console.log(id);
    console.log("service");
    return this.mensajesRef.doc(id).update({ isRead });
  }

  deleteMessage(id: string) {
    return this.mensajesRef.doc(id).delete();
  }

  getUnreadMessages() {
    return this.db
      .collection("compras", ref => ref.where("isRead", "==", false))
      .valueChanges()
      .pipe(map(msg => msg.length));
  }
}

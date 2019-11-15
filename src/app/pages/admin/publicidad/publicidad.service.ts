import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: "root"
})
export class PublicidadService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  publicidadRef = this.db.collection("publicidad");

  getImages() {
    return this.publicidadRef.valueChanges();
  }

    /**
   * 
   * @param type Filtra las imagenes segun el lado que se requiere.
   */
  loadImages(place: string) {
    return this.publicidadRef.ref.where("place", "==", place).get() .then( a => a.docs.map( i => {
      return { id: i.id, ...i.data()}
    }))
  }

  deleteImage(id: string) {
    return this.publicidadRef.doc(id).delete()
  }
}

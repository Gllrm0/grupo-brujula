import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { promise } from "protractor";

@Injectable({
  providedIn: "root"
})
export class GaleriaService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  private galeriaRef = this.db.collection("galeria");

  getImages(): Observable<Imagen[]> {
    return this.db
      .collection("galeria")
      .snapshotChanges()
      .pipe(
        map(snaps => {
          return snaps.map(snap => {
            console.log(snap);

            return <Imagen>{
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            };
          });
        })
      );
  }

  update(id, image: Partial<Imagen>) {
    return this.db
      .collection("galeria")
      .doc(id)
      .update(image);
  }

  async delete(image: Imagen) {
    const { id, path } = image;
    await this.storage
      .ref(path)
      .delete()
      .toPromise(),
      await this.galeriaRef.doc(id).delete();
  }
}

export interface Imagen {
  id?: string;
  path: string;
  createdAt: Date;
  downloadUrl: string;
  description: string;
  tags: string[];
  show: boolean;
}

import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, pipe } from "rxjs";
import { Producto } from "./producto";
import { map, finalize } from "rxjs/operators";
import { DetalleProducto } from "./detalle-producto";
import { AngularFireStorage } from "@angular/fire/storage";
import { UploadXHRArgs, UploadFile } from "ng-zorro-antd";

@Injectable({
  providedIn: "root"
})
export class ProductoService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  private productosRef = this.db.collection<Producto>("productos");
  private comprasRef = this.db.collection<DetalleProducto>("compras");

  getProducts(): Observable<Producto[]> {
    return this.productosRef.snapshotChanges().pipe(
      map(snaps => {
        return snaps.map(snap => {
          console.log(snap);

          return <Producto>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data()
          };
        });
      })
    );
  }

  getProductById(id: string) {
    return this.productosRef.doc<Producto>(id).valueChanges();
  }

  updateProduct(id: string, data: Producto) {
    return this.productosRef.doc(id).update(data);
  }

  comprarProducto(detalles: DetalleProducto) {
    const productoId = detalles.productoId as string;
    const producto = {
      ...detalles,
      productoId: this.productosRef.doc(productoId).ref
    };
    return this.comprasRef.add(producto);
  }

  uploadImage(item: UploadXHRArgs) {
    if (!item) return;
    console.log(item);
    const filePath = `productos/${item.file.uid}-${item.file.name}`;
    return this.storage.upload(filePath, item.file).snapshotChanges();
  }
}

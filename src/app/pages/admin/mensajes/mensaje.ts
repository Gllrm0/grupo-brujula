import { DocumentReference } from "@angular/fire/firestore";
import { Producto } from "../productos/producto";

export interface Mensaje {
  producto?: Producto;
  id?: string;
  descripcion: string;
  imagen: string;
  email: string;
  productoId: DocumentReference;

  fecha: Date;
  isRead: boolean;
}

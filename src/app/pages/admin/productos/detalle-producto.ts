import { DocumentReference } from "@angular/fire/firestore";

export interface DetalleProducto {
  id?: string;
  productoId: string | DocumentReference;
  email: string;
  descripcion: string;
  imagen: string;
  fecha: Date;
  isRead: boolean;
}

import { Component, OnInit, Input } from "@angular/core";
import {
  AngularFireUploadTask,
  AngularFireStorage
} from "@angular/fire/storage";
import {
  AngularFirestore,
  SnapshotOptions,
  DocumentReference
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { tap, finalize, map } from "rxjs/operators";
import { UploadTaskSnapshot } from "@angular/fire/storage/interfaces";
import { ProductoService } from "../../productos/producto.service";
import { Producto } from "../../productos/producto";
import { Imagen } from "../galeria.service";

@Component({
  selector: "upload-task",
  templateUrl: "./upload-task.component.html",
  styleUrls: ["./upload-task.component.css"]
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  description: string;
  docRef: DocumentReference;
  products: Observable<Producto[]>;
  selectedTags: string[] = [];
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.startUpload();
    this.products = this.productoService.getProducts();
  }

  startUpload() {
    const path = `galeria/${Date.now()}_${this.file.name}`;
    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        const img = {
          downloadUrl: this.downloadURL,
          path,
          createdAt: new Date(),
          show: true
        };

        this.docRef = await this.db.collection("galeria").add(img);
      })
    );
  }

  isActive(snapshot: UploadTaskSnapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  async updateDescription(event) {
    await this.docRef.update({ description: this.description });
  }

  async handleChange(checked: boolean, tag: string): Promise<void> {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    await this.docRef.update({ tags: this.selectedTags });
  }
}

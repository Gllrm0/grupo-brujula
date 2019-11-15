import { Component, OnInit } from "@angular/core";
import { UploadXHRArgs, NzMessageService, NzModalService } from "ng-zorro-antd";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize, tap, takeLast } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { PublicidadService } from "./publicidad.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-publicidad",
  templateUrl: "./publicidad.component.html",
  styleUrls: ["./publicidad.component.css"]
})
export class PublicidadComponent implements OnInit {
  index1 = 0;
  index2 = 0;
  imagesSide = []
  imagesTop = []
  place: string
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private publicidadService: PublicidadService,
    private nzMessageService: NzMessageService,

  ) {}

  async ngOnInit() {
    this.imagesTop = await this.publicidadService.loadImages("top");
    this.imagesSide = await this.publicidadService.loadImages("side");
  }

  customReq = (item: UploadXHRArgs) => {

    const path = `publicidad/${Date.now()}_${item.file.name}`;
    const ref = this.storage.ref(path);

    const task = this.storage.upload(path, item.file);
    return task
      .snapshotChanges()
      .pipe(
        takeLast(1),
        finalize(async () => {
          const img = {
            downloadUrl: await ref.getDownloadURL().toPromise(),
            path,
            createdAt: new Date(),
            place: this.place
          };
          const i = await this.db.collection("publicidad").add(img);
        })
      )
      .subscribe(e => {
        item.onSuccess!({}, item.file, e);
      });
  };



  onDelete(id: string){    
    this.publicidadService.deleteImage(id).then( res => this.nzMessageService.success("Imagen eliminada"))
  }
}

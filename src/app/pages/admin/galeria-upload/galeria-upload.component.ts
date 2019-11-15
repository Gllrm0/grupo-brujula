import { Component } from "@angular/core";
import { NzMessageService, UploadXHRArgs } from "ng-zorro-antd";
import { takeLast } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";

@Component({
  selector: "app-galeria-upload",
  templateUrl: "./galeria-upload.component.html",
  styleUrls: ["./galeria-upload.component.css"]
})
export class GaleriaUploadComponent {
  isHovering: boolean;
  files: File[] = [];

  constructor(
    private msg: NzMessageService,
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
}

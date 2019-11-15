import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NzModalService } from "ng-zorro-antd";

@Component({
  selector: "app-img-card",
  templateUrl: "./img-card.component.html",
  styleUrls: ["./img-card.component.css"]
})
export class ImgCardComponent implements OnInit {
  @Input() imagen: any;
  @Output() deleteImage = new EventEmitter<string>();

  constructor(private modalService: NzModalService) {}

  ngOnInit() {}

  deleteImg(img) {
    this.deleteImage.next(img.id);
  }

  showDeleteConfirm(id: string): void {
    this.modalService.confirm({
      nzTitle: "Está seguro de eliminar esta imagen?",
      nzContent: "La imagen será eliminada de la base de datos",
      nzOkText: "Si",
      nzOkType: "danger",
      nzOnOk: () => this.deleteImage.next(id),
      nzCancelText: "No"
    });
  }
}

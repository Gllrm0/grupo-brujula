import { Component, OnInit } from "@angular/core";
import { PublicidadService } from "src/app/pages/admin/publicidad/publicidad.service";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"]
})
export class CarouselComponent implements OnInit {
  images = [];
  constructor(private publicidadService: PublicidadService) {}

  async ngOnInit() {
    this.images = await this.publicidadService.loadImages("top");
  }
}

import { Component, OnInit } from '@angular/core';
import { PublicidadService } from 'src/app/pages/admin/publicidad/publicidad.service';

@Component({
  selector: 'app-carousel-side',
  templateUrl: './carousel-side.component.html',
  styleUrls: ['./carousel-side.component.css']
})
export class CarouselSideComponent implements OnInit {

  images = [];

  constructor(private publicidadService: PublicidadService) {}

  async ngOnInit() {
    this.images = await this.publicidadService.loadImages("side");
  }

}

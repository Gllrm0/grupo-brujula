import { Component, OnInit } from "@angular/core";
import { Lightbox } from "ngx-lightbox";

@Component({
  selector: "app-galeria",
  templateUrl: "./galeria.component.html",
  styleUrls: ["./galeria.component.css"]
})
export class GaleriaComponent implements OnInit {
  albums = [];
  constructor(private lightbox: Lightbox) {
    for (let i = 512; i <= 529; i++) {
      const src = `https://picsum.photos/1920/1080/?image=${i}`;
      const caption = "Image " + i + " caption here";
      const thumb = `https://picsum.photos/1920/1080/?image=${i}`;
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };

      this.albums.push(album);
    }
  }

  ngOnInit() {}

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.albums, index);
  }
}

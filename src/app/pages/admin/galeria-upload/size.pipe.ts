import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "size"
})
export class SizePipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    const MB = value / 1024 / 1024;
    return `${MB.toPrecision(1)}`;
  }
}

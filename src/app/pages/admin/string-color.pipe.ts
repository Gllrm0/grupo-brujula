import { Pipe, PipeTransform } from "@angular/core";
import { Md5 } from "ts-md5";

@Pipe({
  name: "stringColor"
})
export class StringColorPipe implements PipeTransform {
  transform(value: string, type: string): any {
    if (typeof value === "string") {
      const hash = Md5.hashStr(value)
        .toString()
        .slice(0, 6);

      if (type === "bg") return `#${hash}30`;
      return `#${hash}EE`;
    }
    return null;
  }
}

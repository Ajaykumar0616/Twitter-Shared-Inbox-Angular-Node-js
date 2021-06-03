import { Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
@Pipe({
  name: "sanitize",
})
export class SanitizePipe implements PipeTransform {
  test: string;
  str: string;
  constructor(protected sanitizer: DomSanitizer) {}

  public transform(value: any): any {
    const URL_REGEXP = /(<\s*\/\s*[A-Za-z]*>)|(<\s*[A-Za-z]*[^>]*>(.*?)<\s*\/\s*[A-Za-z]*>)|(.*?)javascript:(.*?)|(.*?)onchange=(.*?)|(.*?)onkeydown=(.*?)|(.*?)onmouseover=(.*?)|(.*?)onerror=(.*?)|(.*?)<(img|IMG)(.*?)|onload=(.*?)|(.*?)onclick=(.*?)|(.*?)onmouseout=(.*?)|(.*?)vbscript:(.*?)|(.*?)<!--(.*?)|#|%|}|{|=|(.*?)<\script(.*?)>|eval\\((.*?)\\)|src[\r\n]*=[\r\n]*\\\"(.*?)\\\"|src[\r\n]*=[\r\n]*\\\'(.*?)\\\'/;

    this.test = value;

    if (URL_REGEXP.test(value)) {
      return true;
    } else {
      return false;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(bookTitle: string, searchTerm?: string): SafeHtml {
    if (!searchTerm || searchTerm.length < 2) {
      return this.sanitizer.bypassSecurityTrustHtml(bookTitle);
    }

    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const replacedValue =bookTitle.replace(regex, '<mark>$1</mark>');

    return this.sanitizer.bypassSecurityTrustHtml(replacedValue);
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hireDate'
})
export class HireDatePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    return date.toLocaleDateString(); // Format date as needed
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    let MomentDate = moment(value);
    return MomentDate.locale('fa').format('MM/DD HH:mm');
  }

}

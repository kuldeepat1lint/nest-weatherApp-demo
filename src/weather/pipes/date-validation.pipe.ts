import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common'
import { GetWeatherDescriptionDto } from '../dto/get-weather-description.dto'
import * as moment from 'moment'

export class DateValidationPipe implements PipeTransform {
  transform(value: GetWeatherDescriptionDto, meta: ArgumentMetadata) {
    if (this.validateDate(value.date)) {
      return value
    }
    throw new HttpException('Invalid date', HttpStatus.BAD_REQUEST)
  }

  private validateDate(dateStr: string): boolean {
    const givenDate = moment(dateStr, 'MM-DD-YYYY')
    if (!givenDate.isValid()) {
      return false
    }

    const dateLimit = moment().add(7, 'd')
    const currentDate = moment().startOf('day')
    return dateLimit > givenDate && givenDate >= currentDate
  }
}

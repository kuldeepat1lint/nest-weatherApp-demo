import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { GetWeatherDescriptionDto } from './dto/get-weather-description.dto'
import { WeatherDesRO } from './interfaces/weather.interfaces'
import { DateValidationPipe } from './pipes/date-validation.pipe'
import { WeatherService } from './weather.service'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('Weather Description')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiOperation({
    summary: 'Get weather description from lat/lon and date within next 7days',
  })
  @ApiOkResponse({
    description: 'Get weather description for given date and location',
  })
  @ApiBadRequestResponse({
    description:
      'Lat and Lon must be numbers and Date should be within next 7 days',
  })
  @Get('/')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async weatherDescription(
    @Query(DateValidationPipe)
    getWeatherDescriptionDto: GetWeatherDescriptionDto,
  ): Promise<WeatherDesRO> {
    return this.weatherService.fetchWeatherDescription(getWeatherDescriptionDto)
  }
}

import { HttpService } from '@nestjs/axios'
import { HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as moment from 'moment'
import { GetWeatherDescriptionDto } from './dto/get-weather-description.dto'
import { WeatherDesRO } from './interfaces/weather.interfaces'
import { Weather } from './interfaces/weather.interfaces'

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async fetchWeatherDescription(
    getWeatherDescriptionDto: GetWeatherDescriptionDto,
  ): Promise<WeatherDesRO> {
    const { lat, lon, date } = getWeatherDescriptionDto
    const apiKey = this.configService.get('OPEN_WEATHER_MAP_API')

    const apiRes = await this.httpService.axiosRef.get<Weather>(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`,
    )

    const dailyData = apiRes.data.daily

    const reqDate = moment(date, 'MM-DD-YYYY')

    const dayDescription = dailyData.filter((ele) => {
      const elementDate = moment.unix(ele.dt).startOf('day')
      return reqDate.isSame(elementDate)
    })

    const weatherDescription: WeatherDesRO = {
      status: HttpStatus.OK,
      data: dayDescription[0].weather,
    }

    return weatherDescription
  }
}

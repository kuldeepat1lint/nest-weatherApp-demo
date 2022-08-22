import { HttpStatus } from '@nestjs/common'
export interface Weather {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  daily?: DailyEntity[] | null
}
export interface DailyEntity {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: Temp
  feels_like: FeelsLike
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather?: WeatherEntity[] | null
  clouds: number
  pop: number
  uvi: number
  rain?: number | null
}
export interface Temp {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}
export interface FeelsLike {
  day: number
  night: number
  eve: number
  morn: number
}
export interface WeatherEntity {
  id: number
  main: string
  description: string
  icon: string
}

export interface WeatherDesRO {
  status: HttpStatus.OK
  data: WeatherEntity[]
}

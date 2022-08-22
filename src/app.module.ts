import { Module } from '@nestjs/common'
import { WeatherModule } from './weather/weather.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [WeatherModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}

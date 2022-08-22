import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator'

export class GetWeatherDescriptionDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ type: Number, description: 'Latitude of the place' })
  readonly lat: number

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ type: Number, description: 'Longitude of the place' })
  readonly lon: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Date within the next 7days in <MM-DD-YYYY> format',
  })
  readonly date: string
}

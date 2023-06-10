import { Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { AppService } from './app.service';
import { GptDto, GptResponseDto } from './app.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/ping")
  ping(): string {
    return this.appService.pong();
  }

  // @Post("/gpt")
  // @ApiBody({ type: GptDto })
  // async requestGPT(gptDto: GptDto): Promise<GptResponseDto> {
  //   console.log(gptDto)
  //   return await this.appService.requestGPT(gptDto);
  // }

}

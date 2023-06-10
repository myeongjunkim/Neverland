import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai'
import * as config from 'config'
import { GptDto, GptResponseDto } from './app.dto';


@Injectable()
export class AppService {
  pong(): string {
    return 'ping pong!';
  }

  async requestGPT(gptDto: GptDto): Promise<GptResponseDto> {

    const prompt = `${gptDto.text}를 ${gptDto.universe} 세계관에서 진짜 ${gptDto.character}가 실제로 말하는 대사처럼 작성해줘.`

    const secretKey = config.get('secretKey')
    const configuration = new Configuration({
      apiKey: secretKey.gpt
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
    });
    console.log(completion.data.choices);
    return new GptResponseDto(completion.data.choices[0].text.trim());
  }
}

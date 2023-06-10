import { Injectable } from '@nestjs/common';
import { AccountDto } from './account.dto';


@Injectable()
export class AccountService {
    
    create(): AccountDto {
        return new AccountDto()
    }

    login(): AccountDto {
        return new AccountDto()
    }
}

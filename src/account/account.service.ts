import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
    
    create(): string {
        return 'This action adds a new account';
    }
}

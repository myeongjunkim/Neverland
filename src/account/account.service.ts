import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountDto, CreateAccountDto, UpdateAccountDto } from './account.dto';
import { AccountRepository } from './account.repository';


@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountRepository)
        private accountRepository: AccountRepository,
    ) {}

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const account = await this.accountRepository.createAccount(createAccountDto)
        return account
    }

    login(): AccountDto {
        return new AccountDto(1, "마법사의 돌", "asdf")
    }

    async get(id: number): Promise<Account> {
        const account = await this.accountRepository.getAccount(id)
        return account
    }

    async update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
        const account = await this.accountRepository.updateAccount(id, updateAccountDto)
        return account
    }



    me(): AccountDto {
        return new AccountDto(1, "마법사의 돌", "asdf")
    }
}

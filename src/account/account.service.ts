import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Account } from './account.entity';
import { CreateAccountDto, LoginAccountDto, TokenDto, UpdateAccountDto } from './account.dto';
import { AccountRepository } from './account.repository';


@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountRepository)
        private accountRepository: AccountRepository,
        private jwtService: JwtService
    ) {}

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const account = await this.accountRepository.createAccount(createAccountDto)
        return account
    }

    async login(loginAccountDto: LoginAccountDto): Promise<TokenDto> {
        const account = await this.accountRepository.getAccountByEmail(loginAccountDto.email);
        if(account && (await bcrypt.compare(loginAccountDto.password, account.password))) {
            const payload = { id: account.id, email: account.email };
            const accessToken = this.jwtService.sign(payload);

            const currentTime = new Date();
            const expireTime = new Date(currentTime.getTime() + 60 * 60 * 24 * 2 * 1000);
            return new TokenDto(accessToken, expireTime);

        } else {
            throw new UnauthorizedException('login failed')
        }
    }

    async get(id: number): Promise<Account> {
        const account = await this.accountRepository.getAccountById(id)
        return account
    }

    async update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
        const account = await this.accountRepository.updateAccount(id, updateAccountDto)
        return account
    }

}

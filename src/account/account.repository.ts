import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Account } from "./account.entity";
import { CreateAccountDto, UpdateAccountDto } from "./account.dto";
import { CustomRepository } from "src/db/typeorm-ex.decorator";


@CustomRepository(Account)
export class AccountRepository extends Repository<Account> {
    async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createAccountDto.password, salt);
        
        const account = this.create({...createAccountDto, password: hashedPassword});
        try {
            await this.save(account);
            return account;
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing email');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async getAccountById(id: number): Promise<Account> {
        const account = await this.findOneBy({id: id})
        if(account) {
            return account;
        } else {
            throw new NotFoundException(`Can't find account with id ${id}`);
        }
    }

    async getAccountByEmail(email: string): Promise<Account> {
        const account = await this.findOneBy({email: email})
        if(account) {
            return account;
        } else {
            throw new NotFoundException(`Can't find account with id ${email}`);
        }
    }

    async updateAccount(id:number, updateAccountDto: UpdateAccountDto ): Promise<Account> {
        let account = await this.getAccountById(id);
        account.nickname = updateAccountDto.nickname;
        account.universe = updateAccountDto.universe;
        account.character = updateAccountDto.character;
        await this.save(account);
        return account;
    }
}
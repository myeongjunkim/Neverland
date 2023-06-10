import { Account } from "./account.entity";
import { CreateAccountDto, UpdateAccountDto } from "./account.dto";
import { Repository } from "typeorm";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CustomRepository } from "src/db/typeorm-ex.decorator";


@CustomRepository(Account)
export class AccountRepository extends Repository<Account> {
    async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
        const account = this.create({...createAccountDto});
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

    async getAccount(id: number): Promise<Account> {
        const account = await this.findOneBy({id: id})
        if(account) {
            return account;
        } else {
            throw new NotFoundException(`Can't find account with id ${id}`);
        }
    }

    async updateAccount(id:number, updateAccountDto: UpdateAccountDto ): Promise<Account> {
        let account = await this.getAccount(id);
        account.nickname = updateAccountDto.nickname;
        account.universe = updateAccountDto.universe;
        account.character = updateAccountDto.character;
        await this.save(account);
        return account;
    }
}
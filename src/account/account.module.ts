import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { AccountRepository } from './account.repository';

@Module({
  exports: [AccountService],
  imports: [
    TypeOrmExModule.forCustomRepository([AccountRepository]),
  ],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}

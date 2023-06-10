import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AccountDto, CreateAccountDto, LoginAccountDto, UpdateAccountDto } from './account.dto';

@Controller('account')
@ApiTags('Account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post('/create')
    @ApiBody({ type: CreateAccountDto })
    @ApiResponse({ status: 201, description: 'Account has been successfully created', type: AccountDto })
    @ApiOperation({ summary: 'Create account' })
    createAccount(@Body() createAccountDto: CreateAccountDto): AccountDto {
        return this.accountService.create();
    }

    @Post('/update')
    @ApiBody({ type: UpdateAccountDto })
    @ApiResponse({ status: 201, description: 'Account has been successfully updated', type: AccountDto })
    @ApiOperation({ summary: 'Update account' })
    updateAccount(): AccountDto {
        return this.accountService.create();
    }

    @Post('/login')
    @ApiBody({ type: LoginAccountDto })
    @ApiResponse({ status: 200, description: 'Account has been successfully logged in', type: AccountDto })
    @ApiOperation({ summary: 'Login to account' })
    loginAccount(@Body() loginAccountDto: LoginAccountDto): AccountDto {
        return this.accountService.login();
    }




}

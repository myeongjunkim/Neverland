import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
    async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<AccountDto> {
        const account = await this.accountService.create(createAccountDto);
        return new AccountDto(
            account.id, account.nickname, account.email
        );
    }

    
    @Post('/login')
    @ApiBody({ type: LoginAccountDto })
    @ApiResponse({ status: 200, description: 'Account has been successfully logged in', type: AccountDto })
    @ApiOperation({ summary: 'Login to account' })
    loginAccount(@Body() loginAccountDto: LoginAccountDto): AccountDto {
        return this.accountService.login();
    }

    @Post('/me')
    @ApiResponse({ status: 200, description: 'Account info about myself', type: AccountDto })
    @ApiOperation({ summary: 'Get account myself' })
    getAccount(): AccountDto {
        return this.accountService.me();
    }
    
    
    @Get('/:id')
    @ApiResponse({ status: 201, description: 'Get Account', type: AccountDto })
    @ApiOperation({ summary: 'Get account' })
    async getAccountById(@Param('id') id: number): Promise<AccountDto> {
        const account = await this.accountService.get(id);
        return new AccountDto(
            account.id, account.nickname, account.email, account.universe, account.character
        );
    }

    @Post('/:id/update')
    @ApiBody({ type: UpdateAccountDto })
    @ApiResponse({ status: 201, description: 'Account has been successfully updated', type: AccountDto })
    @ApiOperation({ summary: 'Update account' })
    async updateAccount(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountDto> {
        return await this.accountService.update(id=id, updateAccountDto=updateAccountDto);
    }
}
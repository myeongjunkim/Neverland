import { Controller, Get, Post, Req, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';
import { AccountDto, CreateAccountDto, LoginAccountDto, UpdateAccountDto, TokenDto } from './account.dto';

@Controller('account')
@ApiTags('Account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post('/create')
    @ApiBody({ type: CreateAccountDto })
    @ApiResponse({ status: 201, description: 'Account has been successfully created', type: AccountDto })
    @ApiOperation({ summary: 'Create' })
    async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<AccountDto> {
        const account = await this.accountService.create(createAccountDto);
        return new AccountDto(
            account.id, account.nickname, account.email
        );
    }

    @Post('/login')
    @ApiBody({ type: LoginAccountDto })
    @ApiResponse({ status: 200, description: 'Account has been successfully logged in', type: TokenDto })
    @ApiOperation({ summary: 'Login' })
    async loginAccount(@Body() loginAccountDto: LoginAccountDto): Promise<TokenDto> {
        return await this.accountService.login(loginAccountDto);
    }
    
    @Get('/me')
    @UseGuards(AuthGuard())
    @ApiResponse({ status: 200, description: 'Account info about myself', type: AccountDto })
    @ApiOperation({ summary: 'me' })
    async getAccount(@Req() req): Promise<AccountDto> {
        const account = await this.accountService.get(req.user.id);
        return new AccountDto(
            account.id, account.nickname, account.email, account.universe, account.character
        );
    }

    @Get('/:id/detail')
    @ApiResponse({ status: 201, description: 'Get Account', type: AccountDto })
    @ApiOperation({ summary: 'get' })
    async getAccountById(@Param('id') id: number): Promise<AccountDto> {
        const account = await this.accountService.get(id);
        return new AccountDto(
            account.id, account.nickname, account.email, account.universe, account.character
        );
    }

    @Post('/:id/update')
    @ApiBody({ type: UpdateAccountDto })
    @ApiResponse({ status: 201, description: 'Account has been successfully updated', type: AccountDto })
    @ApiOperation({ summary: 'Update' })
    async updateAccount(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountDto> {
        return await this.accountService.update(id=id, updateAccountDto=updateAccountDto);
    }
    

    
    
}
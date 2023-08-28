import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { TransactionTypeService } from './transaction-type.service'
import { CreateTransactionTypeDto } from './dto/create-transaction-type.dto'
import { UpdateTransactionTypeDto } from './dto/update-transaction-type.dto'
import { TransactionType } from './entities/transaction-type.entity'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@Controller('transaction-type')
@ApiTags('TransactionType')
export class TransactionTypeController {
	constructor(
		private readonly transactionTypeService: TransactionTypeService
	) {}

	@Post()
	@ApiBody({ type: CreateTransactionTypeDto })
	async create(
		@Body() createTransactionTypeDto: CreateTransactionTypeDto
	): Promise<TransactionType> {
		return await this.transactionTypeService.create(createTransactionTypeDto)
	}

	@Get()
	async findAll(): Promise<TransactionType[]> {
		return await this.transactionTypeService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<TransactionType> {
		return await this.transactionTypeService.findOne(+id)
	}

	@Patch(':id')
	@ApiBody({ type: UpdateTransactionTypeDto })
	async update(
		@Param('id') id: string,
		@Body() updateTransactionTypeDto: UpdateTransactionTypeDto
	): Promise<void> {
		return await this.transactionTypeService.update(
			+id,
			updateTransactionTypeDto
		)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return await this.transactionTypeService.remove(+id)
	}
}

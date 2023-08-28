import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
	BadRequestException
} from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { Transaction } from './entities/transaction.entity'

@Controller('transactions')
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	@Post('parse-reader')
	@UseInterceptors(FileInterceptor('txt'))
	async parseInvoiceReader(
		@UploadedFile() txtFile: Express.Multer.File
	): Promise<any> {
		if (!txtFile) {
			throw new BadRequestException('No txt file uploaded.')
		}

		const parsedTransactions = await this.transactionsService.parseTransaction(
			txtFile.path
		)

		const savedTransactions: Transaction[] = []

		for (const parsedTransaction of parsedTransactions) {
			const newTransaction =
				await this.transactionsService.create(parsedTransaction)

			savedTransactions.push(newTransaction)
		}

		return savedTransactions
	}

	@Post()
	create(@Body() createTransactionDto: CreateTransactionDto) {
		return this.transactionsService.create(createTransactionDto)
	}

	@Get()
	findAll() {
		return this.transactionsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.transactionsService.findOne(+id)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateTransactionDto: UpdateTransactionDto
	) {
		return this.transactionsService.update(+id, updateTransactionDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.transactionsService.remove(+id)
	}
}

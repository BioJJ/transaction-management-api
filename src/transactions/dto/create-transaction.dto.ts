import { IsNotEmpty } from 'class-validator'
import { TransactionType } from 'src/transaction-type/entities/transaction-type.entity'

export class CreateTransactionDto {
	@IsNotEmpty()
	transactionType: TransactionType
	@IsNotEmpty()
	data: Date
	@IsNotEmpty()
	description: string
	@IsNotEmpty()
	value: number
	@IsNotEmpty()
	seller: string
}

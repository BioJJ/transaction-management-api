import { IsNotEmpty } from 'class-validator'

export class CreateTransactionTypeDto {
	@IsNotEmpty()
	type: number
	@IsNotEmpty()
	description: string
	@IsNotEmpty()
	nature: string
	@IsNotEmpty()
	signal: string
}

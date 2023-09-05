import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'
import { TransactionTypeService } from 'src/transaction-type/transaction-type.service'
import * as fs from 'fs'

@Injectable()
export class TransactionsService {
	constructor(
		@InjectRepository(Transaction)
		private readonly repository: Repository<Transaction>,
		private transactionTypeService: TransactionTypeService
	) {}

	async create(
		createTransactionDto: CreateTransactionDto
	): Promise<Transaction> {
		const transaction = this.repository.create(createTransactionDto)

		return await this.repository.save(transaction)
	}

	async findAll(): Promise<Transaction[]> {
		return await this.repository.find({
			select: [
				'id',
				'data',
				'description',
				'value',
				'seller',
				'transactionType'
			],
			relations: {
				transactionType: true
			}
		})
	}

	async findTransactionType(id: number) {
		return await this.transactionTypeService.findOne(id)
	}

	async findOne(id: number): Promise<Transaction> {
		const transaction = await this.repository.findOne({
			select: [
				'id',
				'data',
				'description',
				'value',
				'seller',
				'transactionType'
			],
			where: { id },
			relations: {
				transactionType: true
			}
		})

		if (!transaction) {
			throw new NotFoundException(`Não achei um transaction com o id ${id}`)
		}

		return transaction
	}

	async update(
		id: number,
		updateTransactionDto: UpdateTransactionDto
	): Promise<void> {
		const transaction = await this.findOne(id)

		this.repository.merge(transaction, updateTransactionDto)
		await this.repository.save(transaction)
	}

	async remove(id: number): Promise<void> {
		await this.findOne(id)

		if (!id) {
			throw new NotFoundException(`Não achei um transaction com o id ${id}`)
		}
		this.repository.softDelete({ id })
	}

	async parseTransaction(filePath: string) {
		const fileContent = fs.readFileSync(filePath, 'utf-8')
		const lines = fileContent.split('\n')
		const transactions: CreateTransactionDto[] = []

		for (const line of lines) {
			if (line.trim() === '') continue

			const type = parseInt(line.substr(0, 1))
			const date = line.substr(1, 25)
			const description = line.substr(26, 30).trim()
			const value = parseInt(line.substr(56, 10))
			const seller = line.substr(66, 20).trim()

			transactions.push({
				transactionType: await this.findTransactionType(type),
				data: new Date(date),
				description,
				value,
				seller
			})
		}

		return transactions
	}
}

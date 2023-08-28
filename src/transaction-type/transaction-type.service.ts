import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTransactionTypeDto } from './dto/create-transaction-type.dto'
import { UpdateTransactionTypeDto } from './dto/update-transaction-type.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TransactionType } from './entities/transaction-type.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TransactionTypeService {
	constructor(
		@InjectRepository(TransactionType)
		private readonly transactionTypeRepository: Repository<TransactionType>
	) {}

	async create(
		createTransactionType: CreateTransactionTypeDto
	): Promise<TransactionType> {
		const transactionType = this.transactionTypeRepository.create(
			createTransactionType
		)

		return await this.transactionTypeRepository.save(transactionType)
	}

	async update(id: number, updateTransactionType: UpdateTransactionTypeDto) {
		const transactionType = await this.findOne(id)

		this.transactionTypeRepository.merge(transactionType, updateTransactionType)
		await this.transactionTypeRepository.save(transactionType)
	}

	async findAll(): Promise<TransactionType[]> {
		return await this.transactionTypeRepository.find({
			select: ['id', 'type', 'description', 'nature', 'signal']
		})
	}

	async findOne(id: number): Promise<TransactionType> {
		const transactionType = await this.transactionTypeRepository.findOneOrFail({
			select: ['id', 'type', 'description', 'nature', 'signal'],
			where: { id }
		})

		if (!id) {
			throw new NotFoundException(`Não achei um transactionType com o id ${id}`)
		}
		return transactionType
	}

	async remove(id: number): Promise<void> {
		await this.findOne(id)

		if (!id) {
			throw new NotFoundException(`Não achei um transactionType com o id ${id}`)
		}
		this.transactionTypeRepository.softDelete({ id })
	}
}

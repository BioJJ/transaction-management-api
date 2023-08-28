import { Transaction } from 'src/transactions/entities/transaction.entity'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity('transaction_type')
export class TransactionType {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	type: number

	@Column()
	description: string

	@Column()
	nature: string

	@Column()
	signal: string

	@OneToMany(() => Transaction, (transaction) => transaction.transactionType)
	transaction: Transaction[]

	@CreateDateColumn({
		type: 'timestamp',
		name: 'create_at',
		default: () => 'CURRENT_TIMESTAMP(6)'
	})
	createAt: Date

	@UpdateDateColumn({
		type: 'timestamp',
		name: 'update_at',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)'
	})
	updateAt: Date

	@DeleteDateColumn({
		type: 'timestamp',
		name: 'deleted_at'
	})
	deletedAt: Date
}

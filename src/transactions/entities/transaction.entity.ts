import { TransactionType } from 'src/transaction-type/entities/transaction-type.entity'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity('transaction')
export class Transaction {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	data: Date

	@Column()
	description: string

	@Column()
	value: number

	@Column()
	seller: string

	@ManyToOne(
		() => TransactionType,
		(transactionType) => transactionType.transaction
	)
	@JoinTable()
	transactionType: TransactionType

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

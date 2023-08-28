import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TransactionsService } from './transactions.service'
import { TransactionsController } from './transactions.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Transaction } from 'src/transactions/entities/transaction.entity'
import { TransactionTypeModule } from 'src/transaction-type/transaction-type.module'

@Module({
	imports: [
		MulterModule.register({
			dest: './uploads'
		}),
		TypeOrmModule.forFeature([Transaction]),
		TransactionTypeModule
	],
	controllers: [TransactionsController],
	providers: [TransactionsService],
	exports: [TransactionsService]
})
export class TransactionsModule {}

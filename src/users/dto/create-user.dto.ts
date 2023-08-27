import { IsNotEmpty, IsEmail, Matches } from 'class-validator'
import { MessagesHelper } from 'src/helpers/messages.helper'
import { RegExHelper } from 'src/helpers/regex.helper'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
	@IsNotEmpty()
	@ApiProperty({
		example: 'Jefferson Coelho',
		description: `O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir informações da pessoa conectada.`
	})
	name: string

	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({
		example: 'email@email.com',
		description: `O e-mail é necessário apra o login, mas não necessariamente precisa ser o mesmo e-mail da rede social que estiver conectada. Login sem rede social precisa de uma senha.`
	})
	email: string

	@Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
	@IsNotEmpty()
	@ApiProperty({
		example: '123@abc',
		description: `É possível conectar com redes sociais sem uma senha, mas para login usando o e-mail diretamente é necessário informar uma senha.`
	})
	password: string

	@IsNotEmpty()
	@ApiProperty({
		example: 'yyyy-MM-dd',
		description: `A data de nascimento pra comprovar idade.`
	})
	dateBirth: string

	@IsNotEmpty()
	@IsNotEmpty()
	@ApiProperty({
		example: '(##) # ####-####',
		description: `Telefone pra contato.`
	})
	phone: string
}

import { ClienteSchema } from '#database/schema'
import { beforeSave } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'

export default class Cliente extends ClienteSchema {
	@beforeSave()
	static async hashSenha(cliente: Cliente) {
		if (cliente.$dirty.senha && cliente.senha) {
			cliente.senha = await hash.make(cliente.senha)
		}
	}
}

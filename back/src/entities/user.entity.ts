import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { Contact } from './contact.entity'

@Entity('users')

class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 45 })
    name: string

    @Column({ type: 'varchar', length: 60 })
    emailPrincipal: string

    @Column({ type: 'varchar', length: 60, nullable: true })
    emailSecondary?: string

    @Column({ type: 'varchar', length: 120, unique: true })
    password: string

    @Column({ type: 'varchar', length: 15 })
    telephonePrincipal: string

    @Column({ type: 'varchar', length: 15, nullable: true })
    telephoneSecondary?: string

    @CreateDateColumn({ type: 'timestamp',  default: () => 'CURRENT_TIMESTAMP'})
    createdAt?: string | Date

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[]

}

export { User } 
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
  
  @Entity("contacts")
  
  class Contact {
    @PrimaryGeneratedColumn('increment')
    id: number
  
    @Column({ type: 'varchar', length: 45 })
    name: string
  
    @Column({ type: 'varchar', length: 60 })
    emailPrincipal: string;

    @Column({ type: 'varchar', length: 60, nullable: true })
    emailSecondary?: string;
  
    @Column({ type: 'varchar', length: 15 })
    telephonePrincipal: string

    @Column({ type: 'varchar', length: 15, nullable: true })
    telephoneSecondary?: string
  
    @CreateDateColumn({ type: 'timestamp',  default: () => 'CURRENT_TIMESTAMP'})
    createdAt?: string | Date


    @ManyToOne(()=> User, {cascade: true, onDelete: "CASCADE"})
    
    user: User
  
  }
  
  export { Contact };
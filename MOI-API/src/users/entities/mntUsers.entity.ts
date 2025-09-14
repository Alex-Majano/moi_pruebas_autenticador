import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { MntTokens } from 'src/auth/entities/MntTokens.entity';
import { MntPermissionsUser } from 'src/auth/entities/MntPermissionsUser.entity';
import { MntRestoreAccount } from './mntRestoreAccount.entity';
import { MntRolUser } from './mntRolUser.entity';

@Entity('mnt_usuarios')
export class MntUsers {
  @PrimaryColumn('uuid')
  id: string; // UUID string

  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'text' })
  password: string; // Encriptado

  @Column({ type: 'boolean', default: true, name: 'activo' })
  active: boolean;

  // ✅ NUEVO: Columna para el secret del 2FA
  @Exclude()
  @Column({ 
    name: 'two_factor_secret', 
    type: 'text', 
    nullable: true,
    default: null 
  })
  two_factor_secret: string;

  // ✅ NUEVO: Columna para indicar si el 2FA está activado
  @Column({ 
    name: 'is_2fa_enabled', 
    type: 'boolean', 
    default: false 
  })
  is_2fa_enabled: boolean;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
  })
  updateAt: Date;

  @Exclude()
  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deletedAt: Date;

  @ManyToOne(() => MntRolUser, (rol) => rol.users, { nullable: false })
  @JoinColumn({ name: 'id_rol' })
  rol: MntRolUser;

  @OneToMany(() => MntPermissionsUser, (permission) => permission.user)
  permissions: MntPermissionsUser[];

  @OneToMany(() => MntTokens, (tokens) => tokens.user)
  tokens: MntTokens[];

  @OneToMany(() => MntRestoreAccount, (restore) => restore.user)
  restoreAccount: MntRestoreAccount[];
}
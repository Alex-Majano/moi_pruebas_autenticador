import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TokenMiddleware } from './middlewares/token.middleware';
import { UsersModule } from '@users/users.module';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { authEntities } from './entities';
import { PermissionsService } from './services/permissions.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ModulesModule } from '@modules/modules.module';
import { EmailModule } from '@email/email.module';
import { TwoFactorModule } from '../two-factor/two-factor.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({}),
    }),
    TypeOrmModule.forFeature([...authEntities]),
    forwardRef(() => UsersModule),
    EmailModule,
    PassportModule.register({ defaultStrategy: 'local' }), // ✅ CORREGIDO: agregar configuración
    ModulesModule,
    TwoFactorModule,
  ],
  providers: [
    AuthService,
    LocalStrategy, // ✅ Debe estar en providers
    JwtStrategy,
    TokenService,
    PermissionsService,
  ],
  controllers: [AuthController],
  exports: [AuthService, PermissionsService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.ALL }, // ← EXCLUIR LOGIN
        { path: 'auth/verify-2fa', method: RequestMethod.ALL }
      )
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
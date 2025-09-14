import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from '@config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule);

    // Configuración de CORS para desarrollo
    app.enableCors({
      origin: 'http://localhost:4000', // Puerto de tu frontend Vue.js
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true, // Si usas cookies o autenticación JWT
      allowedHeaders: 'Content-Type,Authorization,X-Requested-With,Accept',
    });

    // Prefijo global para todas las rutas ⬅️ ¡ESTA ES LA CLAVE!
    app.setGlobalPrefix('api/v1');

    // Configuración de validación global
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Elimina propiedades no definidas en los DTOs
        forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
        transform: true, // Transforma los JSON a instancias de DTO
        transformOptions: {
          enableImplicitConversion: true, // Conversión automática de tipos
        },
      })
    );

    // Configuración de Swagger (OpenAPI)
    const config = new DocumentBuilder()
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingrese el token JWT',
        in: 'header',
      })
      .setTitle('API Documentation')
      .setDescription('Documentación completa de los endpoints de la API')
      .setVersion('1.0')
      .addServer(`http://localhost:${envs.port}`, 'Development Server')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });

    await app.listen(envs.port);
    
    logger.log(`✅ Servidor corriendo en: http://localhost:${envs.port}`);
    logger.log(`📚 Documentación API: http://localhost:${envs.port}/api/docs`);
    
  } catch (err) {
    logger.error('❌ Error al iniciar la aplicación:', err);
    process.exit(1);
  }
}

bootstrap();
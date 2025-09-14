"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const envs_1 = require("./config/envs");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: 'http://localhost:4000',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
            allowedHeaders: 'Content-Type,Authorization,X-Requested-With,Accept',
        });
        app.setGlobalPrefix('api/v1');
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }));
        const config = new swagger_1.DocumentBuilder()
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
            .addServer(`http://localhost:${envs_1.envs.port}`, 'Development Server')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document, {
            swaggerOptions: {
                persistAuthorization: true,
                tagsSorter: 'alpha',
                operationsSorter: 'alpha',
            },
        });
        await app.listen(envs_1.envs.port);
        logger.log(`✅ Servidor corriendo en: http://localhost:${envs_1.envs.port}`);
        logger.log(`📚 Documentación API: http://localhost:${envs_1.envs.port}/api/docs`);
    }
    catch (err) {
        logger.error('❌ Error al iniciar la aplicación:', err);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map
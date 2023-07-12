import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { grpcConfig } from './config/grpc.option';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cs = app.get(ConfigService);
  app.connectMicroservice(grpcConfig(cs));
  app.enableShutdownHooks();
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

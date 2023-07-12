import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { envSchema } from './config/env';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig } from './config/grpc.option';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: envSchema,
    }),
    GrpcReflectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => grpcConfig(cs),
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService, PrismaService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { envSchema } from './config/env'
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig } from './config/grpc.option';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: envSchema,
    }),
		GrpcReflectionModule.registerAsync({
	      imports: [ConfigModule],
	      useFactory: (cs: ConfigService) => grpcConfig(cs),
	      inject: [ConfigService],
	    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

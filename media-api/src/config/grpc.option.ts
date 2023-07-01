import { ConfigService } from '@nestjs/config';
import {
    ClientProviderOptions,
    GrpcOptions,
    Transport,
  } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';
import { TASK_V1ALPHA_PACKAGE_NAME } from 'src/stubs/task/v1alpha/task';

export const grpcConfig = (cs: ConfigService): GrpcOptions => 
	addReflectionToGrpcConfig({
	  transport: Transport.GRPC,
	  options: {
	    url: `0.0.0.0:${cs.get('PORT') || 4002}`,
	    package: TASK_V1ALPHA_PACKAGE_NAME,
	    protoPath: join(__dirname, '../../src/proto/task/v1alpha/task.proto'),
	  },
	});
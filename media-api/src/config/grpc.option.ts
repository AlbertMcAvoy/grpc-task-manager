import { ConfigService } from '@nestjs/config';
import {
    ClientProviderOptions,
    GrpcOptions,
    Transport,
  } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';
import { MEDIA_V1ALPHA_PACKAGE_NAME } from 'src/stubs/media/v1alpha/service';
import { ChannelCredentials, ServerCredentials } from '@grpc/grpc-js';
import { readFileSync } from 'fs';

export const grpcConfig = (cs: ConfigService): GrpcOptions => 
	addReflectionToGrpcConfig({
			transport: Transport.GRPC,
			options: {
			  package: MEDIA_V1ALPHA_PACKAGE_NAME,
			  url: `0.0.0.0:${cs.get('PORT') || 4003}`,
			  credentials: !cs.get<boolean>('insecure')
				? ServerCredentials.createSsl(null, [
					{
					  private_key: readFileSync(cs.get('MEDIA_KEY')),
					  cert_chain: readFileSync(cs.get('MEDIA_CERT')),
					},
				  ])
				: ServerCredentials.createInsecure(),
			  loader: {
				includeDirs: [join(__dirname, '../proto')],
			  },
			  protoPath: [join(__dirname, '../proto/media/v1alpha/service.proto')],
			},
		  } as GrpcOptions);
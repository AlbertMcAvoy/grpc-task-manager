import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';
import { MEDIA_V1ALPHA_PACKAGE_NAME } from 'src/stubs/media/v1alpha/service';

export const grpcConfig = (cs: ConfigService): GrpcOptions =>
  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      package: MEDIA_V1ALPHA_PACKAGE_NAME,
      url: `0.0.0.0:${cs.get('PORT') || 4003}`,
      loader: {
        includeDirs: [join(__dirname, '../../src/proto')],
      },
      protoPath: [
        join(__dirname, '../../src/proto/media/v1alpha/service.proto'),
      ],
    },
  } as GrpcOptions);

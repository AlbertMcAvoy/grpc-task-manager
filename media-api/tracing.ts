import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { GrpcInstrumentation } from '@opentelemetry/instrumentation-grpc';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';

const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'Nom de votre service',
      [SemanticResourceAttributes.SERVICE_VERSION]: 'Version de votre service',
    }),
  });
  
  const exporter = new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces',
  });
  
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
  provider.register();

  registerInstrumentations({
    instrumentations: [
      new GrpcInstrumentation(),
      new WinstonInstrumentation(),
    ],
  });
  
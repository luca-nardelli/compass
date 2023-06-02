import type { ConnectionOptions } from './connection-options';
import type { DataService } from './data-service';
import type { DataServiceImplLogger } from './logger';
import { DataServiceImpl } from './data-service';

export default async function connect(
  connectionOptions: ConnectionOptions,
  signal?: AbortSignal,
  logger?: DataServiceImplLogger
): Promise<DataService> {
  const dataService = new DataServiceImpl(connectionOptions, logger);
  await dataService.connect(signal);
  return dataService;
}

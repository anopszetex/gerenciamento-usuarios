import { buildConnectionConfig } from './src/infra/db';

export default function () {
  return { ...buildConnectionConfig() };
}

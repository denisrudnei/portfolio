import { createConnection } from 'typeorm';
import path from 'path';

export default createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/portfolio',
  entities: [path.resolve(__dirname, '..', 'models/**/*')],
  synchronize: true,
  logging: ['error'],
});

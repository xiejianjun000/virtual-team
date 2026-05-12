import 'dotenv/config';
import { app } from './app';

const PORT = Number(process.env.PORT) || 3001;

async function startServer() {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`API server started on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();

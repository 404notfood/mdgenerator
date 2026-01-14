import pino from 'pino';
import fs from 'fs';
import path from 'path';

// Créer le dossier logs s'il n'existe pas
const logsDir = path.join(process.cwd(), 'storage', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' 
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
        }
      }
    : undefined,
}, pino.destination(path.join(logsDir, 'app.log')));

export default logger;
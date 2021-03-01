import path from 'path';
import app from './app.js';
import chalk from 'chalk';

import enviroment from './configs/enviroment.js';

console.log(chalk.yellowBright(`[MONGO] is starting in ${chalk.bold(String(enviroment.nodeEnv).toUpperCase())}, wait few seconds please`));
app.listen(enviroment.appPort);
console.log(chalk.greenBright(`[SERVER] Started on port ${enviroment.appPort}`));
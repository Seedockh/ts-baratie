import chalk from 'chalk'

export const log = (message, color = '#00adad') => console.log(chalk.hex(color).bold(message))

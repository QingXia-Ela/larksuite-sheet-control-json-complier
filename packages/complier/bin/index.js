import * as Complier from '../dist/node.js'
import yargs from 'yargs'

const argv = yargs(process.argv.slice(2))
  .scriptName('lpm-c')
	.usage('Usage: $0 <command> [options]')
  .argv

// if () {}
await Complier.complieFile(argv._[0])

// console.log(res);


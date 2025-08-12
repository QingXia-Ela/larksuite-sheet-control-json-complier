import * as Complier from '../dist/node.js'
import yargs from 'yargs'

const argv = yargs(process.argv.slice(2))
  .scriptName('lpm-c')
	.usage('Usage: $0 <command> [options]')
  .command('init', 'Create sheet control template.', (yargs) => {
		yargs.positional('name or path', {
			describe: '项目名字或路径',
			type: 'string',
		});
	})
  .argv

if (argv._[0] === 'init') {
}

// if () {}
await Complier.complieFile(argv._[0])

// console.log(res);


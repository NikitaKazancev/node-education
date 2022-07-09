import { fork } from 'child_process';

const forkProcess = fork('dist/fork.js');

forkProcess.on('message', msg => {
	console.log(`Got message: ${msg}`);
});

forkProcess.on('close', code => {
	console.log(`Exit code: ${code}`);
});

forkProcess.send('Ping');
forkProcess.send('disconnect');

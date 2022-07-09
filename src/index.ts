import { exec } from 'child_process';
import { spawn } from 'child_process';

const childProcess = spawn('node', ['dist/factorial']);

childProcess.stdout.on('data', data => {
	console.log(`Stdout: ${data}`);
});

childProcess.stderr.on('data', data => {
	console.log(`Stderr: ${data}`);
});

childProcess.on('exit', code => console.log(`Code: ${code}`));

// const childProcess = exec('dir dist', (err, stdout, stderr) => {
// 	if (err) console.error(err.message);
// 	console.log(`std out: ${stdout}`);
// 	console.log(`std error: ${stderr}`);
// });

// childProcess.on('exit', code => {
// 	console.log(`Exit code: ${code}`);
// });

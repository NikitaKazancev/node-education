import perf_hooks from 'perf_hooks';
import { Worker } from 'worker_threads';
import { fork } from 'child_process';
import { readFileSync } from 'fs';

const perfObserver = new perf_hooks.PerformanceObserver((items, observer) => {
	items
		.getEntries()
		.forEach(entry => console.log(`${entry.name}: ${entry.duration}`));
});
perfObserver.observe({ type: 'measure' });

const file = readFileSync('./dist/1.mp4');

function workerFunction(arr: number[]) {
	return new Promise((resolve, reject) => {
		performance.mark('worker_start');
		const worker = new Worker('./dist/worker.js', {
			workerData: { arr, file },
		});

		worker.on('message', data => {
			performance.mark('worker_end');
			performance.measure('worker', 'worker_start', 'worker_end');
			resolve(data);
		});
	});
}

function forkFunction(arr: number[]) {
	return new Promise((resolve, reject) => {
		performance.mark('fork_start');
		const forkProcess = fork('./dist/fork.js');
		forkProcess.send({ arr, file });

		forkProcess.on('message', data => {
			performance.mark('fork_end');
			performance.measure('fork', 'fork_start', 'fork_end');
			resolve(data);
		});
	});
}

async function main() {
	const arr: number[] = [];
	for (let i = 0; i < 10000; i++) arr.push(i);
	await workerFunction(arr);
	await forkFunction(arr);
}

main();

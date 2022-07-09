import { Worker } from 'worker_threads';
import perf_hooks from 'perf_hooks';

const perfObserver = new perf_hooks.PerformanceObserver((items, observer) => {
	console.log(items.getEntries());
	observer.disconnect();
});
perfObserver.observe({ type: 'measure' });

function compute(arr: number[]): Promise<number[] | Error> {
	return new Promise((resolve, reject) => {
		const worker = new Worker('./dist/worker.js', {
			workerData: { arr },
		});

		worker.on('message', msg => {
			console.log(worker.threadId);
			resolve(msg);
		});

		worker.on('error', err => {
			reject(err);
		});

		worker.on('exit', () => console.log('The end'));
	});
}

async function main() {
	performance.mark('main_start');

	let arr: number[] = [];
	for (let i = 0; i < 10000; i++) arr.push(i);
	await compute(arr);

	performance.mark('main_end');
	performance.measure('main', 'main_start', 'main_end');
}

main();

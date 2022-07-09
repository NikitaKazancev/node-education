import { parentPort, workerData } from 'worker_threads';
import factorial from './factorial.js';

function compute({ arr }: { arr: number[] }): number[] {
	return arr.map(factorial);
}

parentPort?.postMessage(compute(workerData));

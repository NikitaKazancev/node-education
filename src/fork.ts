import { IComputeInput } from './types.js';

import { compute } from './factorial.js';

process.on('message', (msg: IComputeInput) => {
	if (process.send) process.send(compute(msg));
	process.disconnect();
});

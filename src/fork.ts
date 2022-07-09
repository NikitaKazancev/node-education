process.on('message', msg => {
	if (msg == 'disconnect') return process.disconnect();
	console.log(`Client has got: ${msg}`);
	if (process.send) process.send('Pong!');
});

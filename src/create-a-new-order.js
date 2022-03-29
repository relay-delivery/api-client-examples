const { RELAY_API_KEY_V2 } = process.env;
const fetch = require('node-fetch');


(async function() {
	const req = {
		headers: {
			'x-relay-auth': RELAY_API_KEY_V2,
			'Content-Type': 'application/json; charset=utf-8',
		},
		method: 'POST',
		body: JSON.stringify({
			order: {
				externalId: '1234-XNQALT-5',
				producer: {
					name: 'Classy Chocolate Store',
					phone: '3475555555',
					location: {
						address1: '440 Park Ave South',
						apartment: '99th Floor',
						city: 'New York',
						state: 'NY',
						zip: '10016',
					},
				},
				consumer: {
					name: 'Happy Customer',
					phone: '2125555555',
					location: {
						address1: '17 west 17th Street',
						apartment: '2nd Floor',
						city: 'New York',
						state: 'NY',
						zip: '10011',
					},
				},
				price: {
					subTotal: 29.99,
					tip: 5.00,
				},
			},
		}),
	};

	const result = await fetch('https://api.relay.delivery/v2/order', req);
	const response = await result.json();

	if (result.status != 200) {
		console.log(`the order was not accepted`, response);
		return;
	}

	const { orderKey } =  response.order;
	console.log(`${orderKey} was created.`);
})();






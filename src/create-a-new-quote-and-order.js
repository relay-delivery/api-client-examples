const { RELAY_API_KEY_V2 } = process.env;
const fetch = require('node-fetch');

const headers = {
	'x-relay-auth': RELAY_API_KEY_V2,
	'Content-Type': 'application/json; charset=utf-8',
};

async function createOrder() {
	const req = {
		headers,
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
		throw new Error();
	}

	const { orderKey } = response.order;
	return orderKey;
}


(async function () {
	const orderKey = await createOrder();
})();







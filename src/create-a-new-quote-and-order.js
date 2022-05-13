const { RELAY_API_KEY_V2 } = process.env;
const fetch = require('node-fetch');

function createPostRequest(body) {
	return {
		headers: {
			'x-relay-auth': RELAY_API_KEY_V2,
			'Content-Type': 'application/json; charset=utf-8',
		},
		method: 'POST',
		body: JSON.stringify(body),
	};
}

(async function() {
	const producer = {
		name: 'Classy Chocolate Store',
		phone: '3475555555',
		location: {
			address1: '440 Park Ave South',
			apartment: '99th Floor',
			city: 'New York',
			state: 'NY',
			zip: '10016',
		},
	};

	const consumer = {
		name: 'Happy Customer',
		phone: '2125555555',
		location: {
			address1: '17 west 17th Street',
			apartment: '2nd Floor',
			city: 'New York',
			state: 'NY',
			zip: '10011',
		},
	};

	const req = {
		headers: {
			'x-relay-auth': RELAY_API_KEY_V2,
			'Content-Type': 'application/json; charset=utf-8',
		},
		method: 'POST',
		body: JSON.stringify({
		}),
	};

	const quoteReq = createPostRequest({
		quote: {
			producer,
			consumer,
		},
	});

	const quoteResponse = await fetch('https://dev-api.relay.delivery/v2/quote', quoteReq);
	const quoteResult = await quoteResponse.json();

	if (quoteResponse.status != 201) {
		console.log(`a quote was not provided`, quoteResult);
		return;
	}

	const { quote } = quoteResult;
	const { quoteKey } = quote;

	const orderReq = createPostRequest({
		order: {
			externalId: `api-client-example-5`,
			quoteKey,
			producer,
			consumer,
			price: {
				subTotal: 29.99,
				tip: 5.00,
			},
		},
	});

	const orderResponse = await fetch('https://dev-api.relay.delivery/v2/order', orderReq);
	const orderResult = await orderResponse.json();


	if (orderResponse.status != 201) {
		console.log(`an order was not created`, orderResult);
		return;
	}

	console.dir(orderResult);


})();






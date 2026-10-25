// The cards live in memory (this was the "no database" project), so they reset when the
// server restarts. temp and condition are stored if sent, but the client looks the weather
// up itself each time a card renders.
let cardsArr = [];

let id = 0;

//finds a card by the :id route param
const findCardIndex = (c) => cardsArr.findIndex((val) => val.id === Number(c.req.param('id')));

export default {
	read: (c) => {
		//returning to the user
		return c.json(cardsArr);
	},

	create: async (c) => {
		//incrimenting the id
		id++;

		//destructing the body
		const { city, state, temp, condition } = await c.req.json();

		//the card to be created
		cardsArr.push({
			id        : id,
			city      : city,
			state     : state,
			temp      : temp,
			condition : condition
		});

		//returning to the user
		return c.json(cardsArr);
	},

	update: async (c) => {
		//making shortcuts
		const { city, state, temp, condition } = await c.req.json();

		//finding the index
		const cardIndex = findCardIndex(c);
		if (cardIndex === -1) return c.json({ error: 'Card not found.' }, 404);
		const val = cardsArr[cardIndex];

		//what the card is replaced with (empty fields keep the old value)
		cardsArr[cardIndex] = {
			id        : val.id,
			city      : city      || val.city,
			state     : state     || val.state,
			temp      : temp      || val.temp,
			condition : condition || val.condition
		};

		//returning to the user
		return c.json(cardsArr);
	},

	delete: (c) => {
		//finding the card index
		const cardIndex = findCardIndex(c);

		//removing the card from the array (an unknown id used to remove the last card)
		if (cardIndex !== -1) cardsArr.splice(cardIndex, 1);

		//returning to the user
		return c.json(cardsArr);
	},

	//empties the cards (used by the tests)
	reset: () => {
		cardsArr = [];
		id = 0;
	}
};

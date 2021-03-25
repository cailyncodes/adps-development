import fetch from 'cross-fetch';

export default async function handler(req, res) {
	const { query } = req;
	const { id, name, donor } = query;

	const data = {
		id,
		name,
		donor,
	}

	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	fetch('https://hooks.airtable.com/workflows/v1/genericWebhook/appzxB5RlQYgvjqZe/wflmZ5b4q7Xznkc4u/wtr6paPgepr2JRcW2', options);
  res.status(200).json({ success: true });
}
import fetch from 'cross-fetch';

export default async function handler(req, res) {
	const { query } = req;
	const { id, status } = query;

	const data = {
		id,
		status,
	}

	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	await fetch('https://hooks.airtable.com/workflows/v1/genericWebhook/appzxB5RlQYgvjqZe/wflhJkPEza07Mymq1/wtroTYWyKD7c6Ne4g', options);
  res.status(200).json({ success: true });
}
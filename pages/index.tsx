import Head from 'next/head'
import Cookies from 'universal-cookie';
import fetch from 'cross-fetch';
import styles from '../styles/Home.module.css';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Home: NextPage<any> = ({
	id,
	donor,
	name
}) => {
	const cookies = new Cookies();

	useEffect(() => {
		if (!name) {
			const pendingName = window.prompt('Please enter your full name:');
			if (pendingName) { 
				cookies.set('name', pendingName);
			}
			window.location.reload();
		}
	});

	const [status, setStatus] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	useEffect(() => {
		if (loading) {
			fetch(`/api/update-status?id=${id}&status=${status}`);
			setLoading(false);
		}

		if (!loading && status) {
			setShowConfirm(true);
		}
	}, [loading, status]);

	const updateStatus = async (status) => {
		setShowConfirm(false);
		setStatus(status);
		setLoading(true);
	}

  return (
    <div className={styles.container}>
      <Head>
        <title>ADPS Development</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>ADPS Development Donor Phone-a-thon</h1>
				<p>Please refresh the Airtable page and make sure your name shows up in the Claimee field. If not, someone else got to this person first. Please find someone else. If it is you, start contacting them and get closer to that Bingo!</p>
				<br />
				<p>If you are the Claimee, use the buttons below to report on your call.</p>
				<div className={styles['action-container']}>
					<button onClick={() => updateStatus('Contacted - Email')}>Contacted by email</button>
					<button onClick={() => updateStatus('Contacted - Text')}>Contacted by text</button>
					<button onClick={() => updateStatus('Contacted - Phone')}>Contacted by phone</button>
				</div>
				{showConfirm && <p>Updated! - You can close this page</p>}
			</main>
    </div>
  )
}

export async function getServerSideProps(context) {
	const { req, query } = context;
	const { id, donor } = query;

	const cookies = new Cookies(req.headers.cookie);
	const name = cookies.get('name') || null;

	if (name) {
		const data = {
			id,
			donor,
			name
		}
	
		const options = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}

		fetch('https://hooks.airtable.com/workflows/v1/genericWebhook/appzxB5RlQYgvjqZe/wflmZ5b4q7Xznkc4u/wtr6paPgepr2JRcW2', options);
	}

	return {
		props: {
			id: id || null,
			donor: donor || null,
			name,
		}
	}
}

export default Home;

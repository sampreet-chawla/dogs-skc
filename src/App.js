import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Display from './Display';
import Form from './Form';

function App() {
	const url = 'http://localhost:4500';
	const [dogs, setDogs] = useState([]);

	// Empty Dog for form
	const emptyDog = {
		name: '',
		age: 0,
		img: '',
	};

	const [selectedDog, setSelectedDog] = useState(emptyDog);

	// Function to fetch dogs
	const getDogs = () => {
		fetch(url + '/dog/')
			.then((res) => res.json())
			.then((data) => setDogs(data));
	};

	useEffect(getDogs, []);

	// handle function for creating dogs
	const handleCreate = (newDog) => {
		fetch(url + '/dog/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newDog),
		}).then((res) => getDogs());
	};

	const selectDog = (dog) => {
		setSelectedDog(dog);
	};

	//HandleUpdate to to update the dog when form is submitted
	const handleUpdate = (dog) => {
		fetch(url + '/dog/' + dog._id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dog),
		}).then((res) => getDogs());
	};

	// Delete Dog function to Delete a Dog
	const deleteDog = (dog) => {
		fetch(url + '/dog/' + dog._id, {
			method: 'delete',
		}).then((res) => getDogs());
	};

	return (
		<div className='App'>
			<h1>DOG LISTING SITE</h1>
			<hr />
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => (
							<Display
								{...rp}
								dogs={dogs}
								selectDog={selectDog}
								deleteDog={deleteDog}
							/>
						)}
					/>
					<Route
						exact
						path='/create'
						render={(rp) => (
							<Form
								{...rp}
								label='create'
								dog={{ emptyDog }}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form
								{...rp}
								label='update'
								dog={selectedDog}
								handleSubmit={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;

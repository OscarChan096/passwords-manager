import React from 'react';
import Main from './components/Main';
import Add from './components/Add';
import Login from './components/Login';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import About from './components/About';

function App() {

	return (
		<div className="App">
			<Routes>
				<Route index element={<Navigate replace to='/sp' />} />
				<Route path='/sp' element={<Main />} />
				<Route path='/add' element={<Add />} />
				<Route path='/login' element={<Login />} />
				<Route path='/about' element={<About/>} />
			</Routes>
		</div>
	);
}

export default App;

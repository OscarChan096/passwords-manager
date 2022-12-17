import React, { useState } from 'react';
import Main from './components/Main';
import Add from './components/Add';
import Login from './components/Login';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import About from './components/About';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

function App() {

	const [isUserLogged, setIsUserLogged] = useState(false);

	return (
		<div className="App">
			<Routes>

				<Route index element={<Navigate replace to='/login' />} />

				<Route path='/login' element={<Login userLogged={(value) => setIsUserLogged(value)} />} />

				<Route element={<ProtectedRoute isAuth={isUserLogged} userLogged={(value) => setIsUserLogged(value)} />}>
					<Route path='/sp' element={<Dashboard />} />
					<Route path='/add' element={<Add />} />
					<Route path='/about' element={<About />} />
				</Route>

			</Routes>
		</div>
	);
}

export default App;

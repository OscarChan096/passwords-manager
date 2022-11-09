import React from 'react';
import Main from './components/Main';
import Add from './components/Add';
import { Routes, Route, Navigate} from 'react-router-dom';

import './App.css';

function App() {

	return (
		<div className="App">
			<Routes>
				<Route index element={ <Navigate replace to='/sp' /> } />
				<Route path='/sp' element={<Main />} />
				<Route path='/add' element={<Add />} />
			</Routes>
		</div>
	);
}

export default App;

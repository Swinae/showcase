import './App.css'
import { Route, Routes } from 'react-router-dom'
import { NavbarTop } from './components/NavbarTop'
import { HomePage } from './pages/Home/Home'

function App() {

	return (
		<>
			<header>
				<NavbarTop />
			</header>

			<main>
				<Routes>
					<Route path='/' element={<HomePage />}/>
				</Routes>
			</main>
		</>
	)
}

export default App

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { NavbarTop } from './components/NarbarTop/NavbarTop'
import { HomePage } from './pages/Home/Home'
import { Footer } from './components/Footer/Footer'
import { MytripsPage } from './pages/Mytrips/Mytrips'

function App() {

	return (
		<>
			<header>
				<NavbarTop />
			</header>

			<main>
				<Routes>
					<Route path='/' element={<HomePage />}/>
					<Route path='/mytrips' element={<MytripsPage />}></Route>
					<Route path='/mytrips/:tripId'></Route>
				</Routes>
			</main>

			<footer>
				<Footer />
			</footer>
		</>
	)
}

export default App

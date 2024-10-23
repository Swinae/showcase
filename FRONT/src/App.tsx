import './styles/variables.css'
import './styles/App.css'
import { Route, Routes } from 'react-router-dom'
import { NavbarTop } from './components/NarbarTop/NavbarTop'
import { HomePage } from './pages/Home/Home'
import { Footer } from './components/Footer/Footer'
import { MytripsPage } from './pages/Mytrips/Mytrips'
import { TripDetailsPage } from './pages/TripDetails/TripDetails'
import { SignInPage } from './pages/SignIn/SignIn'
import { RegisterPage } from './pages/Register/Register'

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
					<Route path='/mytrips/:tripId' element={<TripDetailsPage />}></Route>
					<Route path='/signin' element={<SignInPage />}></Route>
					<Route path='/register' element={<RegisterPage />}></Route>
				</Routes>
			</main>

			<footer>
				<Footer />
			</footer>
		</>
	)
}

export default App

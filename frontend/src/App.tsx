import './App.css'
import Header from './Widgets/Header/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Work from './Pages/Work/Work'
import MainPage from './Pages/MainPage/MainPage'

function App() {
	return (
		<Router>
			<div className='container'>
				{/* <Header/> */}
				<main>
					<Routes>
						<Route path='*' element={<Work />} />
						<Route path='/' element={<MainPage />} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default App

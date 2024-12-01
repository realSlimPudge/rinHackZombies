import React from 'react'
import styles from './MainPage.module.scss'
import Animation from '../../Widgets/Welcome/Animation'
import Constructor from '../../Widgets/Constructor/Constructor'

const MainPage: React.FC = () => {
	return (
		<>
			<Animation />
			<Constructor />
		</>
	)
}

export default MainPage

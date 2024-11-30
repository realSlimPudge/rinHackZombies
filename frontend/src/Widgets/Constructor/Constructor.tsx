import React from 'react'
import styles from './Constructor.module.scss'
import Paper from '../Paper/Paper'
import Settings from '../Settings/Settings'

const Constructor: React.FC = () => {
	return (
		<section className={styles.container}>
			<div className={styles.content}>
				<p>Конструктор</p>
				<div className={styles.instruments}>
					<Paper />
					<div className={styles.separator}></div>
					<Settings />
				</div>
			</div>
		</section>
	)
}

export default Constructor

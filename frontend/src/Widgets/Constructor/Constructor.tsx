import React from 'react'
import styles from './Constructor.module.scss'
import Paper from '../Paper/Paper'
import Settings from '../Settings/Settings'
import { useDispatch } from 'react-redux'
import useSendSettings from '../Functions/useSendSettings'

const Constructor: React.FC = () => {
	const dispatch = useDispatch()
	const sendSettingsToServer = useSendSettings()
	const handleSendSettings = () => {
		sendSettingsToServer()
	}

	return (
		<section className={styles.container}>
			<div className={styles.content}>
				<p>Конструктор</p>
				<div className={styles.instruments}>
					<Paper />
					<div className={styles.separator}></div>
					<Settings />
				</div>
				<button onClick={handleSendSettings} className={styles.send}>
					Отправить
				</button>
			</div>
		</section>
	)
}

export default Constructor

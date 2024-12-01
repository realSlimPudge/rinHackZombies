import React from 'react'
import styles from './Constructor.module.scss'
import Paper from '../Paper/Paper'
import Settings from '../Settings/Settings'
import useSendSettings from '../Functions/useSendSettings'
import useSendImages from '../Functions/useSendImages'

const Constructor: React.FC = () => {
	const sendSettingsToServer = useSendSettings()
	const sendImagesToServer = useSendImages()
	const handleSendSettings = () => {
		sendSettingsToServer()
		sendImagesToServer()
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

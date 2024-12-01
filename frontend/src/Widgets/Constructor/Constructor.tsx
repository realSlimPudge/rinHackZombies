import React, { useState } from 'react'
import styles from './Constructor.module.scss'
import Paper from '../Paper/Paper'
import Settings from '../Settings/Settings'
import useSendSettings from '../Functions/useSendSettings'
import useSendImages from '../Functions/useSendImages'
import useSendEmail from '../Functions/useSendEmail'

const Constructor: React.FC = () => {
	const sendSettingsToServer = useSendSettings()
	const sendImagesToServer = useSendImages()

	const [email, setEmail] = useState('')
	const sendEmailToServer = useSendEmail({ email })
	const handleSendSettings = () => {
		sendSettingsToServer()
		sendImagesToServer()
		sendEmailToServer()
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
				<div className={styles.send}>
					<input
						type='email'
						placeholder='Введите email'
						onChange={e => {
							setEmail(e.target.value)
						}}
					/>
					<button
						onClick={handleSendSettings}
						className={styles.send}
					>
						Отправить
					</button>
				</div>
			</div>
		</section>
	)
}

export default Constructor

import { RootState } from '../store/store'
import { useSelector } from 'react-redux'

const useSendSettings = () => {
	const settings = useSelector((state: RootState) => state.settings)

	const sendSettingsToServer = async () => {
		try {
			const response = await fetch('https://your-backend-url/settings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(settings),
			})

			if (response.ok) {
				console.log('Settings sent successfully')
			} else {
				console.error('Failed to send settings')
			}
		} catch (error) {
			console.error('Error sending settings:', error)
		}
	}

	return sendSettingsToServer
}

export default useSendSettings

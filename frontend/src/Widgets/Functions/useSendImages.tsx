import { RootState } from '../store/store'
import { useSelector } from 'react-redux'

const useSendImages = () => {
	const images = useSelector((state: RootState) => state.settings.images)

	const sendImagesToServer = async () => {
		try {
			const response = await fetch('http://localhost:3000/images', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(images),
			})
			if (response.ok) {
				console.log('Images sent successfully')
			} else {
				console.error('Failed to send images')
			}
		} catch (error) {
			console.error('Error sending settings:', error)
		}
	}

	return sendImagesToServer
}

export default useSendImages

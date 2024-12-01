import { RootState } from '../store/store'
import { useSelector } from 'react-redux'

const useSendImages = () => {
	const images = useSelector((state: RootState) => state.settings.images)

	const sendImagesToServer = async () => {
		try {
			// const formData = new FormData()

			// images.forEach((image, index) => {
			// 	const byteCharacters = atob(image.split(',')[1])
			// 	const byteNumbers = new Array(byteCharacters.length)
			// 	for (let i = 0; i < byteCharacters.length; i++) {
			// 		byteNumbers[i] = byteCharacters.charCodeAt(i)
			// 	}
			// 	const byteArray = new Uint8Array(byteNumbers)
			// 	const blob = new Blob([byteArray], { type: 'image/png' })
			// 	formData.append(`image${index}`, blob)
			// })

			const response = await fetch('http://localhost:3000/images', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(images),
				// body: formData,
			})
			if (response.ok) {
				console.log('Images sent successfully')
			} else {
				console.error('Failed to send images')
			}
		} catch (error) {
			console.error('Error sending images:', error)
		}
	}

	return sendImagesToServer
}

export default useSendImages

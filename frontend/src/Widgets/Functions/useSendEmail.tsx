interface EmailProps {
	email: string
}

const useSendEmail = ({ email }: EmailProps) => {
	const sendEmailToServer = async () => {
		try {
			const response = await fetch(
				'https://your-backend-url/send/email',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				}
			)
			if (response.ok) {
				console.log('Email sent successfully')
			} else {
				console.error('Failed to send email')
			}
		} catch (error) {
			console.error('Error sending email:', error)
		}
	}

	return sendEmailToServer
}

export default useSendEmail

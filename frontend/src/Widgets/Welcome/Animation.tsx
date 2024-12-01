import React, { useState } from 'react'
import styles from './Animation.module.scss'

const Animation: React.FC = () => {
	const [visible, setVisible] = useState<boolean>(false)

	setTimeout(() => {
		setVisible(true)
	}, 300)

	return (
		<section className={styles.content}>
			<div className={styles.animation}>
				<div className={styles.black}>
					<svg
						width='85'
						height='181'
						viewBox='0 0 85 181'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M0.469046 0.27713L0.581621 0.354437C5.94749 4.06033 11.6511 6.93843 17.1046 10.4508C27.436 16.7254 37.7926 22.938 48.1428 29.1661C60.2067 36.5237 72.3393 43.7033 84.3906 51.0997C84.4469 77.6449 84.4469 104.189 84.3906 130.734C84.5032 147.213 84.4093 163.693 84.3281 180.171C56.1978 163.011 28.1428 145.65 0 128.521C0.14384 85.7759 0.337712 43.0225 0.469046 0.27713Z'
							fill='#111111'
						/>
					</svg>
				</div>
				<div
					className={`${styles.red} ${visible ? styles.visible : ''}`}
				>
					<svg
						width='82'
						height='173'
						viewBox='0 0 82 173'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M0 49L82 0V122.5L0 173V49Z' fill='#DD4433' />
					</svg>
				</div>
				<div className={styles.brown}>
					<svg
						width='82'
						height='173'
						viewBox='0 0 82 173'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M0 49L82 0V122.5L0 173V49Z' fill='#A82A1C' />
					</svg>
				</div>
			</div>
			<div className={styles.title}>
				<p>Быстрые</p>
				<p>отчеты</p>
			</div>
			<div className={styles.const}>
				<p>Конструктор</p>
				<div>
					<svg
						fill='#000000'
						height='800px'
						width='800px'
						version='1.1'
						id='Layer_1'
						xmlns='http://www.w3.org/2000/svg'
						xmlns:xlink='http://www.w3.org/1999/xlink'
						viewBox='0 0 330 330'
						xml:space='preserve'
					>
						<path
							id='XMLID_222_'
							d='M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
	C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
	C255,161.018,253.42,157.202,250.606,154.389z'
						/>
					</svg>
				</div>
			</div>
		</section>
	)
}

export default Animation

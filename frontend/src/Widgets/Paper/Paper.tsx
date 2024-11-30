import React from 'react'
import styles from './Paper.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { removeImage } from '../../store/features/settingsSlice'
import { useDispatch } from 'react-redux'

const Paper: React.FC = () => {
	const width = useSelector((state: RootState) => state.settings.width)
	const height = useSelector((state: RootState) => state.settings.height)
	const columns = useSelector((state: RootState) => state.settings.columns)
	const rows = useSelector((state: RootState) => state.settings.rows)
	const images = useSelector((state: RootState) => state.settings.images)
	const dispatch = useDispatch()
	const strokeWidth = useSelector(
		(state: RootState) => state.settings.strokeWidth
	)
	const strokeColor = useSelector(
		(state: RootState) => state.settings.strokeColor
	)
	const deleteImg = (i: number) => {
		dispatch(removeImage(i))
	}
	return (
		<div className={styles.content}>
			<div className={styles.container}>
				<div className={styles.width}>{width} см</div>
				<div
					className={styles.paper}
					style={{
						padding: strokeWidth,
						columnGap: strokeWidth,
						rowGap: strokeWidth,
						background: strokeColor,
						display: 'grid',
						gridTemplateColumns: `repeat(${columns},1fr)`,
						gridTemplateRows: `repeat(${rows},1fr)`,
						width: `calc(5px * ${width})`,
						height: `calc(5px * ${height})`,
					}}
				>
					{Array.from({ length: columns * rows }).map(
						(_, cellIndex) => {
							const imageIndex = cellIndex % images.length
							return (
								<div
									key={cellIndex}
									className={styles.img}
									// style={{
									// 	width: `${(width * 5) / columns} px`,
									// 	height: `${(height * 5) / rows} px`,
									// }}
								>
									{images[imageIndex] && (
										<img
											src={images[imageIndex]}
											alt={`Uploaded ${imageIndex}`}
											className={styles.pattern}
										/>
									)}
									{/* {(width * 5) / columns - strokeWidth}
									<br />
									{(height * 5) / rows - strokeWidth} */}
								</div>
							)
						}
					)}
				</div>
				<div className={styles.height}>{height} см</div>
			</div>
			<div
				className={`${styles.list} ${
					images.length > 0 ? styles.active : ''
				}`}
			>
				{images.map((el, i) => (
					<div key={i} className={styles.animation}>
						<div>
							<img src={el} alt='' />
						</div>
						<button
							className={styles.delete}
							onClick={() => {
								deleteImg(i)
							}}
						>
							<svg
								width='64'
								height='64'
								viewBox='0 0 64 64'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z'
									fill='black'
								/>
							</svg>
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default Paper

import React, { useEffect, useRef, useState } from 'react'
import styles from './Settings.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import {
	setHeight,
	setWidth,
	setColumns,
	setRows,
	setStrokeWidth,
	setStrokeColor,
	addImage,
	setOrientation,
} from '../../store/features/settingsSlice'

const Settings: React.FC = () => {
	const width = useSelector((state: RootState) => state.settings.width)
	const height = useSelector((state: RootState) => state.settings.height)
	const columns = useSelector((state: RootState) => state.settings.columns)
	const rows = useSelector((state: RootState) => state.settings.rows)
	const stroke = useSelector((state: RootState) => state.settings.strokeWidth)
	const orientation = useSelector(
		(state: RootState) => state.settings.orientation
	)
	const dispatch = useDispatch()

	const fileInputRef = useRef<HTMLInputElement>(null)

	const btnClick = () => {
		fileInputRef.current?.click()
	}

	const changeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (/^\d*$/.test(value)) {
			if (value === '') {
				dispatch(setWidth(100))
			} else {
				dispatch(setWidth(Number(value)))
			}
		} else {
			e.target.value = width.toString()
		}
	}
	const changeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (/^\d*$/.test(value)) {
			if (value === '') {
				dispatch(setHeight(70))
			} else {
				dispatch(setHeight(Number(value)))
			}
		} else {
			e.target.value = height.toString()
		}
	}
	const changeColumns = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === '0' || e.target.value === '') {
			dispatch(setColumns(1))
		} else {
			dispatch(setColumns(Number(e.target.value)))
		}
	}
	const changeRows = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === '0' || e.target.value === '') {
			dispatch(setRows(1))
		} else {
			dispatch(setRows(Number(e.target.value)))
		}
	}
	const changeStrokeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setStrokeWidth(Number(e.target.value)))
	}
	const changeStrokeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setStrokeColor(e.target.value))
	}
	const changeOrientation = () => {
		dispatch(setOrientation(!orientation))
	}
	const readFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			const readers: FileReader[] = []

			for (let i = 0; i < files.length; i++) {
				const reader = new FileReader()
				const file = files[i]

				reader.onload = e => {
					if (e.target?.result) {
						dispatch(addImage(e.target.result as string))
					}
				}
				reader.readAsDataURL(file)
				readers.push(reader)
			}
		}
	}
	useEffect(() => {
		dispatch(setWidth(height))
		dispatch(setHeight(width))
	}, [orientation])
	return (
		<div className={styles.content}>
			<p>Настройки</p>
			<div className={styles.settings}>
				<div className={styles.size}>
					<div className={styles.width}>
						<label>Ширина см:</label>
						<input
							type='number'
							placeholder={width.toString()}
							onChange={changeWidth}
							min={0}
							max={100}
						/>
					</div>
					<div className={styles.height}>
						<label>Высота см:</label>
						<input
							type='number'
							placeholder={height.toString()}
							onChange={changeHeight}
							min={0}
							max={100}
						/>
					</div>
				</div>
				<div className={styles.separator}></div>
				<div className={styles.columns}>
					<div>
						<label>
							Кол-во<br></br>столбцов:
						</label>
						<input
							type='number'
							placeholder={columns.toString()}
							onChange={changeColumns}
							min={1}
							max={100}
						/>
					</div>
					<div>
						<label>
							Кол-во<br></br>строк:
						</label>
						<input
							type='number'
							placeholder={rows.toString()}
							onChange={changeRows}
							min={1}
							max={100}
						/>
					</div>
				</div>
				<div className={styles.separator}></div>
				<div className={styles.size}>
					<div className={styles.width}>
						<label>Ширина границ:</label>
						<input
							type='number'
							placeholder={stroke.toString()}
							onChange={changeStrokeWidth}
							min={1}
							max={100}
						/>
					</div>
					<div className={styles.color}>
						<label>Цвет границ:</label>
						<input type='color' onChange={changeStrokeColor} />
					</div>
				</div>
				<div className={styles.separator}></div>
				<div className={styles.image}>
					<input
						type='file'
						onChange={readFile}
						style={{ display: 'none' }}
						ref={fileInputRef}
						multiple
						accept='image/*'
					/>
					<button onClick={btnClick}>Загрузить фотографии</button>
				</div>
				<div className={styles.orientation}>
					<button onClick={changeOrientation}>
						Поменять ориентацию
					</button>
				</div>
			</div>
		</div>
	)
}

export default Settings

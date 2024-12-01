import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
	width: number
	height: number
	columns: number
	rows: number
	strokeWidth: number
	strokeColor: string
	images: string[]
	orientation: boolean
	pattern: 'row' | 'column' | 'diagonal' | 'anti-diagonal' | 'cyclic'
}

const initialState: SettingsState = {
	width: 84,
	height: 70,
	columns: 1,
	rows: 1,
	strokeWidth: 0,
	strokeColor: '#000000',
	images: [],
	orientation: false,
	pattern: 'cyclic',
}

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setWidth: (state, action: PayloadAction<number>) => {
			state.width = action.payload
		},
		setHeight: (state, action: PayloadAction<number>) => {
			state.height = action.payload
		},
		setColumns: (state, action: PayloadAction<number>) => {
			state.columns = action.payload
		},
		setRows: (state, action: PayloadAction<number>) => {
			state.rows = action.payload
		},
		setStrokeWidth: (state, action: PayloadAction<number>) => {
			state.strokeWidth = action.payload
		},
		setStrokeColor: (state, action: PayloadAction<string>) => {
			state.strokeColor = action.payload
		},
		addImage: (state, action: PayloadAction<string>) => {
			state.images.push(action.payload)
		},
		removeImage: (state, action: PayloadAction<number>) => {
			state.images.splice(action.payload, 1)
		},
		setOrientation: (state, action: PayloadAction<boolean>) => {
			state.orientation = action.payload
		},
		setPattern: (
			state,
			action: PayloadAction<
				'row' | 'column' | 'diagonal' | 'anti-diagonal' | 'cyclic'
			>
		) => {
			state.pattern = action.payload
		},
	},
})

export const {
	setWidth,
	setHeight,
	setColumns,
	setRows,
	setStrokeWidth,
	setStrokeColor,
	addImage,
	removeImage,
	setOrientation,
	setPattern,
} = settingsSlice.actions
export default settingsSlice.reducer

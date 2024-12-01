import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from '../store/features/settingsSlice'

const store = configureStore({
	reducer: {
		settings: settingsReducer,
	},
})

export default store

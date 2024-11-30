import { configureStore } from '@reduxjs/toolkit'
import settingsReduser from './features/settingsSlice'

const store = configureStore({
	reducer: {
		settings: settingsReduser,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

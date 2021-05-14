import React from 'react'
import { useLocalStorage } from './useLocalStorage'

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useLocalStorage('authState')

	return (
		<AuthStateContext.Provider value={authState}>
			<AuthDispatchContext.Provider value={setAuthState}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	)
}

const useAuthState = () => {
	const authState = React.useContext(AuthStateContext)

	if (typeof authState == 'undefined') {
		throw new Error('useAuthState must be used within a AuthProvider')
	}

	return authState
}

const useAuthenticate = () => {
	const setAuthState = React.useContext(AuthDispatchContext)

	if (typeof setAuthState == 'undefined') {
		throw new Error('useAuthenticate must be used within a AuthProvider')
	}

	const authenticate = React.useCallback(
		({ user, token }) => {
			setAuthState({ user, token })
		},
		[setAuthState]
	)

	return authenticate
}

const useLogout = () => {
	const setAuthState = React.useContext(AuthDispatchContext)

	if (typeof setAuthState == 'undefined') {
		throw new Error('useAuthenticate must be used within a AuthProvider')
	}

	const logout = React.useCallback(() => {
		setAuthState({ user: null, token: null })
	}, [setAuthState])

	return logout
}

export { AuthProvider, useAuthState, useAuthenticate, useLogout }

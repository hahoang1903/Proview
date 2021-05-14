import React from 'react'
import { useLocalStorage } from './useLocalStorage'

const useAuthState = () => {
	const [authState] = useLocalStorage('authState')

	return authState
}

const useAuthenticate = () => {
	const [, setAuthState] = useLocalStorage('authState')

	const authenticate = React.useCallback(
		({ user, token }) => {
			setAuthState({ user, token })
		},
		[setAuthState]
	)

	return authenticate
}

const useLogout = () => {
	const [, setAuthState] = useLocalStorage('authState')

	const logout = React.useCallback(() => {
		setAuthState({ user: null, token: null })
	}, [setAuthState])

	return logout
}

export { useAuthState, useAuthenticate, useLogout }

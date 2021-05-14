import React from 'react'

const useLocalStorage = (
	key,
	defaultValue = '',
	{ serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
	const [state, setState] = React.useState(() => {
		var valueInLocalStorage
		if (typeof window != 'undefined')
			valueInLocalStorage = window.localStorage.getItem(key)

		if (valueInLocalStorage) return deserialize(valueInLocalStorage)

		return typeof defaultValue == 'function' ? defaultValue() : defaultValue
	})

	const prevKeyRef = React.useRef(key)

	React.useEffect(() => {
		const prevKey = prevKeyRef.current
		if (prevKey !== key) window.localStorage.removeItem(prevKey)

		prevKeyRef.current = key
		window.localStorage.setItem(key, serialize(state))
	}, [key, serialize, state])

	return [state, setState]
}

export { useLocalStorage }

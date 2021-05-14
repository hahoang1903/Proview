import 'antd/dist/antd.css'
import '../styles/main.scss'
import { AuthProvider } from '../hooks/useAuth'

export default function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	)
}

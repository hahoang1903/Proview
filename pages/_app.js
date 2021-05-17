import 'antd/dist/antd.css'
import '../styles/main.scss'
import { AuthProvider } from '../hooks/useAuth'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', url => {
	console.log(`Loading: ${url}`)
	NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	)
}

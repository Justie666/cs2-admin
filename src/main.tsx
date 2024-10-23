import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { IndexLayout } from './layout'
import { LoginPage } from './pages/LoginPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { FinancePage } from './pages/FinancePage'
import { UsersPage } from './pages/UsersPage'
import { AdminsPage } from './pages/AdminsPage'
import { MatchesPage } from './pages/MatchesPage'
import { SkinsPage } from './pages/SkinsPage'
import { CasePage } from './pages/CasePage'
import { PromoPage } from './pages/PromoPage'

const router = createBrowserRouter([
	{ path: '/', element: <LoginPage /> },
	{
		path: '/main',
		element: <IndexLayout />,
		children: [
			{
				path: '/main/finance',
				element: <FinancePage />
			},
			{
				path: '/main/users',
				element: <UsersPage />
			},

			{
				path: '/main/admins',
				element: <AdminsPage />
			},

			{
				path: '/main/matches',
				element: <MatchesPage />
			},
			{ path: '/main/skins', element: <SkinsPage /> },
			{ path: '/main/cases', element: <CasePage /> },
			{ path: '/main/promo', element: <PromoPage /> }
		]
	}
])

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false
		}
	}
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<Toaster />
		</QueryClientProvider>
	</StrictMode>
)

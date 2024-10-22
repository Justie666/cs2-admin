import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CategoryPage } from './pages/CategoryPage'
import { IndexLayout } from './layout'
import { LoginPage } from './pages/LoginPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DisputePage } from './pages/DisputePage'
import { Toaster } from 'sonner'
import { FinancePage } from './pages/FinancePage'
import { UsersPage } from './pages/UsersPage'
import { StatisticsPage } from './pages/StatisticsPage'
import { AdminsPage } from './pages/AdminsPage'
import { MatchesPage } from './pages/MatchesPage'
import { SkinsPage } from './pages/SkinsPage'

const router = createBrowserRouter([
	{ path: '/', element: <LoginPage /> },
	{
		path: '/main',
		element: <IndexLayout />,
		children: [
			{
				path: '/main/category',
				element: <CategoryPage />
			},
			{
				path: '/main/dispute',
				element: <DisputePage />
			},
			{
				path: '/main/finance',
				element: <FinancePage />
			},
			{
				path: '/main/users',
				element: <UsersPage />
			},
			{
				path: '/main/statistics',
				element: <StatisticsPage />
			},
			{
				path: '/main/admins',
				element: <AdminsPage />
			},
			{
				path: '/main/category',
				element: <CategoryPage />
			},
			{
				path: '/main/matches',
				element: <MatchesPage />
			},
			{ path: '/main/skins', element: <SkinsPage /> }
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

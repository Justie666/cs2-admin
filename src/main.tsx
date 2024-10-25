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
import { StatisticsPage } from './pages/StatisticsPage'
import { ApiPage } from './pages/ApiPage'
import { ReceivingSkinsPage } from './pages/ReceivingSkinsPage'

const router = createBrowserRouter([
	{ path: '/', element: <LoginPage /> },
	{
		path: '/admin/main',
		element: <IndexLayout />,
		children: [
			{
				path: '/admin/main/finance',
				element: <FinancePage />
			},
			{
				path: '/admin/main/SDAMA:XM"SA"K:JI)PURIQWJDKLSADSA',
				element: <UsersPage />
			},

			{
				path: '/admin/main/DJLSJDLKASJDLKASJDNLKSAN:CLKASJXLKAJLK',
				element: <AdminsPage />
			},

			{
				path: '/admin/main/XKMSAIOUWQRYNZAXNJKASHDLKSAJDLJIORWQUO',
				element: <MatchesPage />
			},
			{
				path: '/admin/main/XMAOPISJOIEJROINASLKC:JALSKFJKLSA:JD:LK',
				element: <SkinsPage />
			},
			{
				path: '/admin/main/MXASKOJDIOJQIORJKSDNACXNZMC',
				element: <CasePage />
			},
			{
				path: '/admin/main/CXZSDFADS',
				element: <StatisticsPage />
			},
			{
				path: '/admin/main/ASKRWQPOKDSAM',
				element: <ApiPage />
			},
			{
				path: '/admin/main/ZJOIWQREUWQHJDKNBSALKJXSAFLKJLHS',
				element: <PromoPage />
			},
			{
				path: '/admin/main/XASUROIQJDSALKNXASKJD',
				element: <ReceivingSkinsPage />
			}
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

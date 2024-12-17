import { QueryClient } from '@tanstack/react-query'

const MAX_RETRIES = 2

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Number.POSITIVE_INFINITY,
			retry: MAX_RETRIES
		}
	}
})

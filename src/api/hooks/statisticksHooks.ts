import { useQuery } from '@tanstack/react-query'
import { statisticsService } from '../service/statisticsService'

export const useGetStatistics = () => {
	return useQuery({
		queryKey: ['statistics'],
		queryFn: () => statisticsService.getAll()
	})
}

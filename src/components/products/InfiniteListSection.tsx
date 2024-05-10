import api from '@/utils/api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react';

export const getList = async (lastId, size) => {
	const res = await api.get(`/products?lastId=${lastId}&size=${size}`);
	console.log(res);
	const list = res.data;
	return { list, nextLastId: list[list.length - 1]?.id, isLast: list.length < size }
}

export default function Projects() {
	const { ref, inView } = useInView();
	const fetchProjects = async ({ pageParam = 9999999 }) => getList(pageParam, 20)
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ['projects'],
		queryFn: fetchProjects,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => !lastPage.isLast ? lastPage.nextLastId : undefined
	})

	useEffect(() => {

	}, [inView])

	return status === 'pending' ? (
		<p>Loading...</p>
	) : status === 'error' ? (
		<p>Error: {error.message}</p>
	) : (
		<>
			{data.pages.map((page, i) => (
				<div key={i}>
					{page.data.map((product) => (
						<p key={product.id}>{product.productTitle}</p>
					))}
				</div>
			))}
			<div>
				<button
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage || isFetchingNextPage}
				>
					{isFetchingNextPage
						? 'Loading more...'
						: hasNextPage
							? 'Load More'
							: 'Nothing more to load'}
				</button>
			</div>
			<div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
		</>
	)
}

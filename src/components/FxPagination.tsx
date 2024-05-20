'use client'
import { Pagination } from "@mui/material";

export default function FxPagination({ count, page, onChange }) {
	return (
		<div className="paginationBar">
			<Pagination
				count={count}
				page={page}
				onChange={onChange}
				showFirstButton={true}
				showLastButton={true}
				size='medium'
				variant="outlined" shape="rounded"
			/>
		</div >)
}
'use client'
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import api from '@/utils/api';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@/store/atoms';
import { dateFormatterYYYYMMDDHHmm } from '@/utils/common';
import { styled } from '@mui/material';
import { getProductSalesNameKR } from "@/utils/product";

interface BuyColumn {
	id: 'salesTypeId' | 'productTitle' | 'productPrice' | 'nickname' | 'createDate';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const buyColumns: readonly BuyColumn[] = [

	{
		id: 'salesTypeId', label: '판매방식', minWidth: 100,
		format: (value: string) => getProductSalesNameKR(value)
	},
	{ id: 'productTitle', label: '상품명', minWidth: 300 },
	{ id: 'productPrice', label: '금액', minWidth: 150 },
	{ id: 'nickname', label: '판매자', minWidth: 170 },
	{
		id: 'createDate',
		label: '거래날짜',
		minWidth: 170,
		format: (value: string) => dateFormatterYYYYMMDDHHmm(value)
	},
];

interface BuyData {
	salesTypeId: string;
	productTitle: string;
	productPrice: string;
	nickname: string;
	createDate: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

export default function StickyHeadTable() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const [buys, setBuys] = useState([]);
	const user = useRecoilValue(userInfoState);


	const getList = async () => {
		const result = await api.get(`/buys?buyerId=${user.id}`);
		const { data: { resultCode, data } } = result;
		if (resultCode === "200") {
			setBuys(data);
		}
	}

	useEffect(() => {
		getList();

	}, [])



	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{buyColumns.map((column) => (
								<StyledTableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</StyledTableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{buys
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((buy) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1}>
										{buyColumns.map((column) => {
											const value = buy[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: column.format && (column.id === 'createDate' || column.id === 'salesTypeId') ? column.format(value) : value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 15, 25]}
				component="div"
				count={buys.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
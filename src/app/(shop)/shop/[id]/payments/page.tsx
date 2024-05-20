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

interface PaymentColumn {
	id: 'impUid' | 'email' | 'amount' | 'status' | 'createDate';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const paymentColumns: readonly PaymentColumn[] = [
	{ id: 'impUid', label: '결제번호', minWidth: 170 },
	{
		id: 'createDate',
		label: '결제일자',
		minWidth: 170,
		format: (value: string) => dateFormatterYYYYMMDDHHmm(value)
	},
	{ id: 'email', label: '이메일', minWidth: 100 },
	{

		id: 'amount',
		label: '결제금액',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'status',
		label: '결제상태',
		minWidth: 170,
		align: 'right',
		format: (value: string) => value === 'paid' ? '결제성공' : value
	}
];

interface PaymentData {
	impUid: string;
	email: string;
	amount: number;
	status: string;
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

	const [payments, setPayments] = useState([]);
	const user = useRecoilValue(userInfoState);

	const getList = async () => {
		const result = await api.get(`/payments?email=${user.email}`);
		const { data: { resultCode, data } } = result;
		if (resultCode === "200") {
			setPayments(data);
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
							{paymentColumns.map((column) => (
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
						{payments
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((payment) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={payment.impUid}>
										{paymentColumns.map((column) => {
											const value = payment[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: column.format && (column.id === 'status' || column.id === 'createDate') ? column.format(value) : value}
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
				count={payments.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
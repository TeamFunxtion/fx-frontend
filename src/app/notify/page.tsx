'use client'

import NoResult from "@/components/NoResult";
import useUserInfo from "@/hooks/useUserInfo"
import api from "@/utils/api"
import { dateFormatterYYYYMMDDHHmm } from "@/utils/common";
import { Avatar, Box, Button, ButtonProps, Paper, Stack, Typography, styled } from "@mui/material";
import { blue, purple } from "@mui/material/colors";
import { useEffect, useState } from "react"

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	maxWidth: 400,
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: theme.palette.getContrastText(blue[500]),
	backgroundColor: blue[500],
	'&:hover': {
		backgroundColor: blue[700],
	},
}));

export default function Notification() {
	const { user } = useUserInfo();
	const [notifications, setNotifications] = useState([]);
	const [page, setPage] = useState(1)
	const [totalCount, setTotalCount] = useState(0)
	const [last, setLast] = useState(false);

	const
		getUserNotifications = async (pageNo) => {
			const list = pageNo == 1 ? [] : notifications;

			const result = await api.get(`/notify?id=${user.id}&page=${pageNo}&size=2`);
			setNotifications([
				...list,
				...result.data.content
			]);
			setTotalCount(result.data.totalElements)
			setLast(result.data.last)
		}

	useEffect(() => {
		getUserNotifications(1);
	}, [])

	const onClickNewList = () => {
		getUserNotifications(page + 1);
		setPage(page + 1);
	}

	const remove = async () => {
		if (!(notifications.length > 0)) {
			return;
		}

		const result = await api.delete(`/notify?id=${user.id}`);
		if (result.data) {
			setPage(1);
			getUserNotifications(1);
		}
	}

	return (
		<div style={{ background: '#f0f0f0', height: '100%', overflow: 'scroll', paddingBottom: '50px' }}>
			<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '25px' }}>
				<h1 style={{ marginRight: '50px', fontSize: '1.3rem', fontWeight: 600 }}>전체 {totalCount}</h1>
				<button onClick={remove}>모든알림 삭제</button>
			</div>
			{
				notifications.length === 0 ? <NoResult text="알림 내역이 없네요!" /> : <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
					{
						notifications && notifications.map((notification, index) => (
							<Item
								sx={{
									my: 1,
									mx: 'auto',
									p: 3,
									marginTop: 2
								}}
							>
								<Stack spacing={2} direction="column" alignItems="left">
									<Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
										<Avatar>
											<img src={notification.productDto.thumbnailUrl} width="100%" />
										</Avatar>
										<Typography noWrap style={{ fontWeight: 600 }}>{notification.productDto.productTitle}</Typography>
										<Typography noWrap style={{ fontSize: '0.8rem' }}>{dateFormatterYYYYMMDDHHmm(notification.createDate)}</Typography>
									</Stack>
									<Typography style={{ fontSize: '0.9rem' }}>{notification.message}</Typography>
								</Stack>
							</Item>
						))
					}
				</Box>
			}
			{
				(notifications.length > 0 && !last) && <div style={{ marginTop: '10px', textAlign: 'center' }}>
					<ColorButton variant="contained" onClick={onClickNewList}>더 보기</ColorButton>
				</div>
			}

		</div >

	)
}
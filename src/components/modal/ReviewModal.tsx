"use client"
import { useState } from 'react';
import { ModalBody, ModalBox, ModalContent, ModalFooter, ModalHeader } from './modalStyle'
import { Rating, TextField, styled } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import toast from 'react-hot-toast';

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#ff6d75',
	},
	'& .MuiRating-iconHover': {
		color: '#ff3d47',
	},
});


export default function ReviewModal({ clickModal, enrollReview }) {

	const [rating, setRating] = useState(3);
	const [content, setContent] = useState("");

	const handleOk = () => {
		if (!content) {
			toast.error("리뷰를 작성하세요!");
			return;
		}
		enrollReview(content, rating);
	}

	return (
		<ModalBox onClick={clickModal}>
			<ModalContent onClick={(e) => e.stopPropagation()} style={{ width: '21rem' }}>
				<ModalHeader>
					<h2>😎 판매자 리뷰 작성하기</h2>
					<h3>판매자나 상품에 대한 리뷰를 작성하세요.</h3>
				</ModalHeader>
				<ModalBody>
					<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
						<StyledRating
							name="customized-color"
							defaultValue={3}
							size="large"
							getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
							// precision={0.5}
							onChange={(event, newValue) => {
								setRating(newValue);
							}}
							icon={<FavoriteIcon fontSize="inherit" />}
							emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
						/>
					</div>
					<div>
						<TextField
							id="filled-multiline-static"
							label="리뷰를 작성하세요."
							multiline
							rows={4}
							maxRows={4}
							defaultValue=""
							variant="filled"
							fullWidth
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button onClick={clickModal} className='btn-close'>취소</button>
					<button onClick={handleOk} >등록</button>
				</ModalFooter>
			</ModalContent>
		</ModalBox>
	)
}
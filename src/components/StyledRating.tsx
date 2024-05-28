'use client'

import { Rating, styled } from "@mui/material";

export const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#ff6d75',
	},
	'& .MuiRating-iconHover': {
		color: '#ff3d47',
	},
});


export const StyledRatingDisabled = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#ff3d47',
	},
	'& .MuiRating-iconHover': {
		color: '#ff3d47',
	},
});

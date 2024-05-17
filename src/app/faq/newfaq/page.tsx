"use client";
import React, { useState } from 'react';
import api from '@/utils/api';

export default function NewFAQ() {
	const [formData, setFormData] = useState({
		title: '',
		content: ''
	});

	const [submitted, setSubmitted] = useState(false); // 새 글 등록 완료 여부를 나타내는 상태 추가

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post('/faqs', formData);
			console.log('New FAQ added:', response.data);
			setSubmitted(true); // 새 글이 성공적으로 등록되면 submitted 값을 true로 변경
		} catch (error) {
			console.error('Error adding new FAQ:', error);
		}
	};

	// 새 글이 등록되었을 때 보여줄 화면
	if (submitted) {
		return (
			<div>
				<h1>새 글이 성공적으로 등록되었습니다!</h1>
			</div>
		);
	}

	// 아직 새 글을 등록하지 않았을 때 보여줄 화면
	return (
		<div>
			<h1>새 글 등록</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>제목:</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>내용:</label>
					<textarea
						name="content"
						value={formData.content}
						onChange={handleChange}
						required
					></textarea>
				</div>
				<button type="submit">등록</button>
			</form>
		</div>
	);
}
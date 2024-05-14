"use client"
import { ModalBody, ModalBox, ModalContent, ModalFooter, ModalHeader } from './modalStyle'

export default function LogoutModal({ clickModal, logout }) {
	return (
		<ModalBox onClick={clickModal}>
			<ModalContent onClick={(e) => e.stopPropagation()} style={{ width: '21rem' }}>
				<ModalHeader>
					<h2>😮‍💨 Logout</h2>
					<h3>정말 로그아웃 하시겠습니까!?</h3>
				</ModalHeader>
				<ModalBody>
				</ModalBody>
				<ModalFooter>
					<button onClick={clickModal} className='btn-close'>취소</button>
					<button onClick={logout} >확인</button>
				</ModalFooter>
			</ModalContent>
		</ModalBox>
	)
}
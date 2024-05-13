// modalStyle.tsx
import styled from '@emotion/styled'

// 모달 창 뒷배경
export const ModalBox = styled.div`
	position: fixed;
	top: 0;
  left: 0;
  width: 100%;
  height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
	align-items: center;
	z-index: 9999;
`

// 여기에 만들고 싶은 모달 스타일 구현
export const ModalContent = styled.div`
    padding: 1.5rem 3rem;
    width: 25.125rem;
    border-radius: 0.313rem;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;

		b {
			font-weight: 600;
		}
}
`

export const ModalHeader = styled.div`
	text-align:center;
	padding: 15px 0;

	> h2 {
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 15px;
	}

	> h3 {
		fot-size: 1.3rem;
	}
`

export const ModalBody = styled.div`
	> p {
		text-align:center;
	}

	> input {
		width:100%;
		padding: 15px;
		box-sizing:border-box;
		font-size: 1.5rem;
		border: none;
		outline: none;
		border-bottom: 2px solid dodgerblue;
		text-align: center;
	}
`
export const ModalFooter = styled.div`
	margin-top: 20px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;	

	> button {
		padding: 15px;
		font-size: 1rem;
		background-color: dodgerblue;
		color: white;
	}

	> .btn-close {
		background-color: white;
		color: black;
	}

	> .disabled {
		background-color: grey;
	}

	
`

export default function NoResult({ text }) {
	return (
		<div className="noResult">
			😝 {text ? text : '조회된 결과가 없습니다.'}
		</div>
	)
}
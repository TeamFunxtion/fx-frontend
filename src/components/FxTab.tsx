'use client'
import styles from "@/styles/FxTab.module.css"
import { useState } from "react"

export default function FxTab({ items, onClick, fullWidth }) {
	const [index, setIndex] = useState(0);

	const clickTab = (idx) => {
		setIndex(idx);
		onClick(idx);
	}

	return (
		<ul style={{ display: 'grid', gridTemplateColumns: fullWidth ? `repeat(${items.length}, 1fr)` : 'repeat(auto-fill, minmax(160px, 1fr))' }}>
			{
				items && items.map((tab, idx) => (
					<li className={`${styles.tabItem} ${idx === index && styles.active}`} key={idx} onClick={() => clickTab(idx)}>
						{tab.label}
					</li>
				))
			}
		</ul>
	)
}
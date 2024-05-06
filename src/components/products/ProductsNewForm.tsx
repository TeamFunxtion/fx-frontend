'use client'
import { BsCardImage, BsX } from "react-icons/bs"
import styles from "./ProductsNewForm.module.css"
import { FormControl, FormControlLabel, FormControlLabelProps, Radio, RadioGroup, RadioGroupProps } from "@mui/material"
import { useForm, SubmitHandler, FieldValues, Control, FieldPath, RegisterOptions, useController } from "react-hook-form"
import api from "@/utils/api"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { categories } from "@/app/constants"
import { useRecoilValue } from "recoil"
import { userInfoState } from "@/store/atoms"

interface FormValues {
	storeId: string,
	productTitle: string,
	categoryId: string,
	productPrice: string,
	productDesc: string,
	qualityTypeId: string,
	salesTypeId: string,
	location: string,
	coolPrice: string,
	endDate: string,
}

export type TControl<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	rules?: Omit<
		RegisterOptions<T>,
		"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
	>;
};

export type TRadioGroup = Omit<FormControlLabelProps, "control">;

// 만약 props 가 더 필요하다면 아래 정의하면 됩니다.
type CustomSelectProps = {
	group: TRadioGroup[];
	size?: "medium" | "small";
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type TProps<T extends FieldValues> = Omit<RadioGroupProps, "onChange"> &
	CustomSelectProps &
	TControl<T>;

export default function ProductsNewForm() {
	const { register, getValues, control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
		defaultValues: {
			storeId: '',
			productTitle: "",
			categoryId: "",
			productPrice: "",
			productDesc: "",
			qualityTypeId: "QU01",
			salesTypeId: "SA01",
			location: "",
			coolPrice: "",
			endDate: "1",
		}
	});
	const router = useRouter();
	const [categoryId, setCategoryId] = useState("CA01");
	const { id } = useRecoilValue(userInfoState)

	const { salesTypeId } = watch();

	const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
		console.log(values)
		const res = await api.post('/products', { ...values, storeId: id, categoryId });
		console.log(res);
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			toast.success(msg || '상품이 등록되었습니다!');
			router.push("/products/sidfdsijfjf");
		} else {
			toast.error(msg || '상품 등록을 실패했습니다!');
		}
	}

	return (
		<section className={styles.section}>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<ul className={styles.list}>
					<h2 className={styles.listTitle}>상품 정보</h2>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>상품 이미지</div>
						<div className={styles.rowContent}>
							<ul className={styles.images}>
								<li><BsCardImage /><br />이미지 업로드</li>
								<li className={styles.imgBox}>
									<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
									<div className={styles.imgDelBtn}>
										<BsX />
									</div>
								</li>
								<li className={styles.imgBox}>
									<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
									<div className={styles.imgDelBtn}>
										<BsX />
									</div>
								</li>
								<li className={styles.imgBox}>
									<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
									<div className={styles.imgDelBtn}>
										<BsX />
									</div>
								</li>
								<li className={styles.imgBox}>
									<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
									<div className={styles.imgDelBtn}>
										<BsX />
									</div>
								</li>
								<li className={styles.imgBox}>
									<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
									<div className={styles.imgDelBtn}>
										<BsX />
									</div>
								</li>
								<li className={styles.imgBox}>
									<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
									<div className={styles.imgDelBtn}>
										<BsX />
									</div>
								</li>
								<li className={styles.imgBox}>
									<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
									<div className={styles.imgDelBtn}>
										<BsX />
									</div>
								</li>
								<li className={styles.imgBox}>
									<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
									<div className={styles.imgDelBtn}>
										<BsX />
									</div>
								</li>
							</ul>
						</div>
					</li>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>상품명</div>
						<div className={styles.rowContent}>
							<input className={styles.input} {...register("productTitle", { required: true, maxLength: { value: 100, message: '최대 100글자까지 입력이 가능합니다.' } })} type="text" placeholder="상품명" />
						</div>
					</li>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>카테고리</div>
						<div className={styles.rowContent}>
							<ul className={styles.categoryList}>
								{
									categories.map(c => (
										<li className={`${styles.categoryItem} ${c.categoryId == categoryId ? styles.selected : ''}`} onClick={() => setCategoryId(c.categoryId)}>{c.categoryName}</li>
									))
								}
							</ul>
						</div>
					</li>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>가격</div>
						<div className={styles.rowContent}>
							<input className={styles.input} {...register("productPrice", { required: true })} type="text" placeholder="가격" />
						</div>
					</li>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>설명</div>
						<div className={styles.rowContent}>
							<textarea className={styles.textArea} {...register("productDesc", { required: true, maxLength: { value: 1000, message: "최대 1000자까지 입력이 가능합니다." } })} placeholder="브랜드, 모델명, 구매 시기, 하자 유무 등 상품 설명을 최대한 자세히 적어주세요." />
						</div>
					</li>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>상품 상태</div>
						<div className={styles.rowContent}>
							<MRadio
								group={qualityTypeRadioGroup}
								name="qualityTypeId"
								control={control}
								rules={{ required: "반드시 입력해주세요." }}
							/>
						</div>
					</li>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>거래 희망 지역</div>
						<div className={styles.rowContent}>
							<input className={styles.input} {...register("location", { required: true, maxLength: { value: 30, message: "최대 30글자까지 입력이 가능합니다." } })} type="text" placeholder="거래 희망 지역" />
						</div>
					</li>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>판매 방법</div>
						<div className={styles.rowContent}>
							<MRadio
								group={salesTypeRadioGroup}
								name="salesTypeId"
								control={control}
								rules={{ required: "반드시 입력해주세요." }}
							/>
						</div>
					</li>
				</ul>

				{ /* 경매 정보 */}
				{
					salesTypeId !== "SA03" && <ul className={styles.list}>
						<h2 className={styles.listTitle}>경매 정보</h2>
						{salesTypeId === "SA01" && <li className={styles.listRow}>
							<div className={styles.rowLabel}>즉시 구매가</div>
							<div className={styles.rowContent}>
								<input className={styles.input} type="text" placeholder="즉시 구매가" />
							</div>
						</li>}
						<li className={styles.listRow}>
							<div className={styles.rowLabel}>경매 종료일</div>
							<div className={styles.rowContent}>
								<MRadio
									group={endDateRadioGroup}
									name="endDate"
									control={control}
									rules={{ required: "반드시 입력해주세요." }}
								/>
							</div>
						</li>
					</ul>
				}
				<footer className={styles.footer}>
					<button disabled={isSubmitting}>등록하기</button>
				</footer>
			</form>
		</section>
	)
}

const qualityTypeRadioGroup: TRadioGroup[] = [
	{ label: "중고", value: "QU01" },
	{ label: "새 상품", value: "QU02" },
];


const salesTypeRadioGroup: TRadioGroup[] = [
	{ label: "일반 경매", value: "SA01" },
	{ label: "블라인드 경매", value: "SA02" },
	{ label: "일반 판매", value: "SA03" },
];

const endDateRadioGroup: TRadioGroup[] = [
	{ label: "1일", value: "1" },
	{ label: "2일", value: "2" },
	{ label: "3일", value: "3" },
];

function MRadio<T extends FieldValues>(props: TProps<T>) {
	const {
		name,
		rules,
		control,
		group,
		size = "medium",
		onChange: propsOnChange,
	} = props;
	const {
		field: { value, onChange },
	} = useController({
		name,
		rules,
		control,
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event);
		if (propsOnChange) {
			propsOnChange(event);
		}
	};

	return (
		<FormControl>
			<RadioGroup row name={name} value={value} onChange={handleChange}>
				{group.map(({ value: radioValue, disabled, label }, index) => (
					<FormControlLabel
						key={index}
						value={radioValue}
						label={label}
						control={
							<Radio size={size} value={radioValue} disabled={disabled} />
						}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}
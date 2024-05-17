'use client'
import { BsCardImage, BsX } from "react-icons/bs"
import styles from "./ProductsNewForm.module.css"
import { useForm, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { categories } from "@/app/constants"
import { useRecoilValue } from "recoil"
import { userInfoState } from "@/store/atoms"
import MRadio, { TRadioGroup } from "../atom/MRadio"
import axios, { AxiosInstance } from "axios"
import api, { fileApi } from "@/utils/api"
import { ErrorMessage } from "@hookform/error-message"

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
	endDays: number,
}

const FILE_MAX_COUNT = 3;

export default function ProductsNewForm({ product }) {
	const productId = product && product.id;
	const isNew = productId === undefined || productId === null;

	const { register, getValues, control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
		defaultValues: {
			storeId: '',
			productTitle: product && product.productTitle || "",
			categoryId: product && product.categoryId || "",
			productPrice: product && product.productPrice || "",
			productDesc: product && product.productDesc || "",
			qualityTypeId: product && product.qualityTypeId || "QU01",
			salesTypeId: product && product.salesTypeId || "SA01",
			location: product && product.location || "",
			coolPrice: product && product.coolPrice || "",
			endDays: isNew ? 1 : 0,
		}
	});

	const saveDisabled = !isNew && product.statusTypeId === "ST01" && product.bids.length > 0;

	const router = useRouter();
	const [categoryId, setCategoryId] = useState((product && product.categoryId) || "CA01");
	const { id } = useRecoilValue(userInfoState)

	const { salesTypeId } = watch();

	const [imgBase64, setImgBase64] = useState([]);
	const [imgFile, setImgFile] = useState([]);

	const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
		if (!id) {
			router.push("/auth/login");
			return false;
		}

		// console.log(values)

		// const fd = new FormData();
		// for (let i = 0; i < imgFile.length; i++) {
		// 	fd.append("file", imgFile[i]);
		// }

		// fd.append("productRequestDto", JSON.stringify({ ...values, storeId: id, categoryId }));

		// // custom hook
		// await fileApi({
		// 	method: 'POST',
		// 	url: '/products/uploadFiles',
		// 	data: fd
		// })
		// 	.then((response) => {
		// 		if (response.data) {
		// 			setImgFile(null);
		// 			setImgBase64([]);
		// 			alert("업로드 완료!");
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log(error)
		// 		alert("실패!");
		// 	})


		const requestbody = {
			...values,
			storeId: id,
			categoryId,
			productPrice: values.productPrice.replace(/[^0-9]+/g, ""),
		};

		if (isNew) { // 생성 
			const res = await api.post('/products', requestbody);
			// console.log(res);
			const { data: { resultCode, msg, data } } = res;
			if (resultCode == '200') {
				toast.success(msg || '상품 등록 성공!');
				router.push(`/products/${data.id}`);
			} else {
				toast.error(msg || '상품 등록 실패!');
			}

		} else { // 수정
			const res = await api.patch('/products/1', requestbody);
			// console.log(res);
			const { data: { resultCode, msg, data } } = res;
			if (resultCode == '200') {
				toast.success(msg || '상품 수정 성공!');
				router.push(`/products/${data.id}`);
			} else {
				toast.error(msg || '상품 수정 실패!');
			}
		}
	}

	const handleChangeFile = (event: any) => {
		// console.log(imgFile.length);
		// console.log(event.target.files.length);
		if (imgFile.length + event.target.files.length > FILE_MAX_COUNT) {
			toast.error(`사진 첨부는 최대 ${FILE_MAX_COUNT}장까지 가능합니다.`);
			return false;
		}

		// console.log(event.target.files);
		setImgFile(imgFile => [...imgFile, ...event.target.files]);
		for (let i = 0; i < event.target.files.length; i++) {
			if (event.target.files[i]) {
				let reader = new FileReader();
				reader.readAsDataURL(event.target.files[i]);
				reader.onloadend = () => {
					const base64 = reader.result; // 비트맵 데이터 리턴, 이 데이터를 통해 파일 미리보기가 가능함
					// console.log(base64)
					if (base64) {
						let base64Sub = base64.toString()
						setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
					}
				}
			}
		}
	}

	const removeImg = (index) => {
		const newImgFile = [...imgFile];
		const newImgBase64 = [...imgBase64];
		newImgFile.splice(index, 1);
		newImgBase64.splice(index, 1);
		setImgFile(newImgFile);
		setImgBase64(newImgBase64);
	}

	useEffect(() => {
		if (!id) {
			router.push("/auth/login");
		}
	}, [])

	return (
		<section className={styles.section}>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<ul className={styles.list}>
					<h2 className={styles.listTitle}>상품 정보</h2>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>상품 이미지<span className={styles.small}>({imgFile.length}/{FILE_MAX_COUNT})</span></div>
						<div className={styles.rowContent}>
							<ul className={styles.images}>
								<label htmlFor="file">
									<li><BsCardImage /><br />이미지 업로드</li>
								</label>
								<input type="file" id="file" onChange={handleChangeFile} multiple style={{ display: 'none' }} />
								{imgBase64.map((item, index) => {
									return (
										<li className={styles.imgBox}>
											<img className={styles.img} src={item} alt="" />
											<div className={styles.imgDelBtn} onClick={() => removeImg(index)}>
												<BsX />
											</div>
										</li>
									)
								})}
							</ul>
						</div>
					</li>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>상품명<sup className={styles.required}>*</sup><span className={styles.small}>({watch("productTitle").length}/30)</span></div>
						<div className={styles.rowContent}>
							<input className={styles.input}
								{...register("productTitle", { required: "필수값 입니다.", maxLength: { value: 30, message: '최대 30글자까지 입력이 가능합니다.' } })}
								type="text"
								placeholder="상품명"
								maxLength={30} />
							<p className={styles.error}><ErrorMessage errors={errors} name="productTitle" /></p>
						</div>
					</li>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>카테고리<sup className={styles.required}>*</sup></div>
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
						<div className={styles.rowLabel}>가격<sup className={styles.required}>*</sup><span className={styles.small}>(1억미만)</span></div>
						<div className={styles.rowContent}>
							<input className={styles.input}
								{...register("productPrice", {
									required: '필수값 입니다.',
									pattern: {
										value: /[0-9]/,
										message: '숫자만 입력 가능합니다.'
									},
								})}
								type="text"
								placeholder="가격"
								maxLength={8} />
							<p className={styles.error}><ErrorMessage errors={errors} name="productPrice" /></p>
						</div>
					</li>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>설명<sup className={styles.required}>*</sup><span className={styles.small}>({watch("productDesc").length}/1000)</span></div>
						<div className={styles.rowContent}>
							<textarea className={styles.textArea}
								{...register("productDesc", { required: '필수값 입니다.', maxLength: { value: 1000, message: "최대 1000자까지 입력이 가능합니다." } })}
								placeholder="브랜드, 모델명, 구매 시기, 하자 유무 등 상품 설명을 최대한 자세히 적어주세요."
								maxLength={1000} />
							<p className={styles.error}><ErrorMessage errors={errors} name="productDesc" /></p>
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
						<div className={styles.rowLabel}>거래 희망 지역<span className={styles.small}>({watch("location").length}/15)</span></div>
						<div className={styles.rowContent}>
							<input className={styles.input} {...register("location",
								{ required: false, maxLength: { value: 15, message: "최대 15글자까지 입력이 가능합니다." } })}
								type="text"
								placeholder="거래 희망 지역"
								maxLength={15}
							/>
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
							<div className={styles.rowLabel}>즉시 구매가<span className={styles.small}>(1억미만)</span></div>
							<div className={styles.rowContent}>
								<input className={styles.input}
									{...register("coolPrice", {
										pattern: {
											value: /[0-9]/,
											message: '숫자만 입력 가능합니다.'
										},
									})}
									type="text"
									placeholder="즉시 구매가"
									maxLength={8}
								/>
								<p className={styles.error}><ErrorMessage errors={errors} name="coolPrice" /></p>
							</div>
						</li>}
						<li className={styles.listRow}>
							<div className={styles.rowLabel}>경매 종료일</div>
							<div className={styles.rowContent}>
								<MRadio
									group={endDaysRadioGroup}
									name="endDays"
									control={control}
									rules={{ required: "반드시 입력해주세요." }}
								/>
							</div>
						</li>
					</ul>
				}
				<footer className={styles.footer}>
					{
						saveDisabled && <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px', color: 'red' }}>
							해당 상품은 경매가 진행중으로 정보 수정이 제한됩니다.
						</div>
					}
					<button className={(isSubmitting || saveDisabled) ? 'disabled' : ''} disabled={isSubmitting || saveDisabled}>{isNew ? '등록하기' : '수정하기'}</button>
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
	{ label: "경매", value: "SA01" },
	{ label: "블라인드 경매", value: "SA02" },
	{ label: "대화 거래", value: "SA03" },
];

const endDaysRadioGroup: TRadioGroup[] = [
	{ label: "1일", value: 1 },
	{ label: "2일", value: 2 },
	{ label: "3일", value: 3 },
];
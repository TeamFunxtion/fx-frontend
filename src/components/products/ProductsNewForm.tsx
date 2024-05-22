'use client'
import { BsCardImage, BsX } from "react-icons/bs"
import styles from "./ProductsNewForm.module.css"
import { useForm, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { categories } from "@/app/constants"
import { useRecoilValue } from "recoil"
import { userInfoState } from "@/store/atoms"
import MRadio, { TRadioGroup } from "../atom/MRadio"
import { fileApi } from "@/utils/api"
import { ErrorMessage } from "@hookform/error-message"
import _ from 'lodash';

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
	const user = useRecoilValue(userInfoState)
	const { id } = user;

	const { salesTypeId } = watch();

	const [imgBase64, setImgBase64] = useState([]);
	const [imgFile, setImgFile] = useState([]);
	const removeImgIds = useRef([]);

	const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
		if (!id) {
			router.push("/auth/login");
			return false;
		}
		// console.log(values)

		if (imgFile.length === 0) {
			toast.error("상품 이미지를 1개 이상 업로드해주세요!");
			return;
		}

		const formData = new FormData();
		for (let i = 0; i < imgFile.length; i++) {
			formData.append("file", imgFile[i]);
		}

		formData.append("newProduct", JSON.stringify({
			...values,
			productId,
			storeId: id,
			categoryId,
			productPrice: String(values.productPrice).replace(/[^0-9]+/g, ""),
			removeImgIds: !isNew ? removeImgIds.current : undefined,
		}));

		await fileApi({
			method: isNew ? 'POST' : 'PATCH',
			url: '/products',
			data: formData
		})
			.then((res) => {
				const { data: { resultCode, msg, data } } = res;
				if (resultCode == '200') {
					toast.success(msg || `상품 ${isNew ? '등록' : '수정'} 성공!`);
					router.push(`/products/${data.id}`);
				} else {
					toast.error(msg || `상품 ${isNew ? '등록' : '수정'} 실패!`);
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error(`상품 ${isNew ? '등록' : '수정'} 실패!`);
			})
	}

	const handleChangeFile = (event: any) => {
		// console.log(imgFile.length);
		// console.log(event.target.files.length);
		if (imgBase64.length + event.target.files.length > FILE_MAX_COUNT) {
			toast.error(`사진 첨부는 최대 ${FILE_MAX_COUNT}장까지 가능합니다.`);
			return false;
		}

		// 파일 크기 1MB 이하인것만 
		const files = _.filter(event.target.files, (file) => {
			return file.size <= (1024 * 1024 * 1);
		})

		if (files.length !== event.target.files.length) {
			toast.error("이미지는 최대 1MB 크기로 제한됩니다.");
		}

		// console.log(event.target.files);
		setImgFile(imgFile => [...imgFile, ...files]);
		for (let i = 0; i < files.length; i++) {
			if (files[i]) {
				let reader = new FileReader();
				reader.readAsDataURL(files[i]);
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
		if (!isNew) { // 수정일때는 기존 이미지를 삭제한건지 체크
			const img = _.find(product.images, { imageUrl: imgBase64[index] });
			if (img && img.id) {
				removeImgIds.current.push(img.id);
			}
		}

		const newImgFile = [...imgFile];
		const newImgBase64 = [...imgBase64];
		newImgFile.splice(index, 1);
		newImgBase64.splice(index, 1);
		setImgFile(newImgFile);
		setImgBase64(newImgBase64);
	}

	useEffect(() => {
		setTimeout(() => {
			if (!id) {
				router.push("/auth/login");
			} else if (!isNew && id !== product.seller.id) {
				router.push("/");
			} else {
				if (!isNew && product.images.length > 0) {
					const images = product.images.map((img) => img.imageUrl);
					setImgBase64(images);
				}
			}
		}, 2000)
	}, [])

	return (
		<section className={styles.section}>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<ul className={styles.list}>
					<h2 className={styles.listTitle}>상품 정보</h2>
					<li className={styles.listRow}>
						<div className={styles.rowLabel}>상품 이미지<sup className={styles.required}>*</sup><span className={styles.small}>({imgFile.length}/{FILE_MAX_COUNT})</span></div>
						<div className={styles.rowContent}>
							<ul className={styles.images}>
								<label htmlFor="file">
									<li style={{ textAlign: 'center' }}><BsCardImage /><br />이미지 업로드<br />(최대 1MB)</li>
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
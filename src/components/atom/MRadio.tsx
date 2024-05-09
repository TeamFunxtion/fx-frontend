import { FormControl, FormControlLabel, FormControlLabelProps, Radio, RadioGroup, RadioGroupProps } from "@mui/material";
import { ChangeEvent } from "react";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";

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


export default function MRadio<T extends FieldValues>(props: TProps<T>) {
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
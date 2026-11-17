import { Select as AntdSelect, type SelectProps as AntdSelectProps } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import styles from './Select.module.scss';

type SelectProps<
    ValueType = unknown,
    OptionType extends DefaultOptionType = DefaultOptionType
> = AntdSelectProps<ValueType, OptionType>

export const Select = <
    ValueType = unknown,
    OptionType extends DefaultOptionType = DefaultOptionType
>({
    value,
    options,
    placeholder,
    size = 'middle',

    labelInValue = false,
    allowClear = true,
    showSearch = false,
    onChange,

    ...selectProps
}: SelectProps<ValueType, OptionType>) => {
    return (
        <AntdSelect
            {...selectProps}
            value={value}
            options={options}

            className={styles.dropdown}
            placeholder={placeholder}
            size={size}

            labelInValue={labelInValue}
            allowClear={allowClear}
            showSearch={showSearch}

            onChange={onChange}
        />
    )
}
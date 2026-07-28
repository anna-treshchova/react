import { Select as AntdSelect } from 'antd';
import styles from './Select.module.scss';

export const Select = ({
    value,
    options,

    size = 'middle',
    placeholder,

    labelInValue = false,
    allowClear = true,
    showSearch = false,
    optionFilterProp,

    onChange,
}) => {
    const searchConfig = showSearch && optionFilterProp
        ? { optionFilterProp }
        : showSearch

    return (
        <AntdSelect
            value={value}
            options={options}

            className={styles.dropdown}
            size={size}
            placeholder={placeholder}

            labelInValue={labelInValue}
            allowClear={allowClear}
            showSearch={searchConfig}

            onChange={onChange}
        />
    )
}
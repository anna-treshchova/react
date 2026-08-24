import { Button, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './PopoverButton.module.scss';

export const PopoverButton = ({
    content,
    placeholder,
    value,
    maxValueWidth,
    placement = 'bottomLeft'
}) => {
    const hasValue = Boolean(value);
    const buttonContent = hasValue ? value : placeholder;

    return (
        <Popover
            content={content}
            trigger='click'
            placement={placement}
        >
            <Button className={`${styles.popoverButton} ${hasValue ? styles.hasValue : ''}`}>
                <span style={{ maxWidth: maxValueWidth }}>
                    {buttonContent}
                </span>
                <DownOutlined className={styles.arrowIcon} />
            </Button>
        </Popover>
    )
}
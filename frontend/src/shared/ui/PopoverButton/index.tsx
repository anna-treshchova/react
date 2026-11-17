import type { ReactNode } from 'react';
import { Button, Popover, type PopoverProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './PopoverButton.module.scss';

type PopoverButtonProps = {
    content: ReactNode;
    placeholder: string;
    value?: string;
    maxValueWidth?: number | string;
    placement?: PopoverProps['placement'];
}

export const PopoverButton = ({
    content,
    placeholder,
    value,
    maxValueWidth,
    placement = 'bottomLeft',
}: PopoverButtonProps) => {

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
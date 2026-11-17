import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { ConfigProvider, Dropdown, type MenuProps } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { useUIStore, selectIsMobile, selectUIActions } from '@/shared/model/uiStore';
import BurgerIcon from '@/shared/assets/icons/burger.svg?react';

import type { User } from '@/entities/user';

import { useLogoutMutation } from '../../model';
import styles from './UserMenu.module.scss';

const MENU_KEYS = {
    HELP: 'help',
    AUTH: 'auth',
    LOGOUT: 'logout',
    WISHLIST: 'wishlist',
} as const;

interface UserMenuProps {
    me: User | undefined;
}

export const UserMenu = ({ me }: UserMenuProps) => {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const [visible, setVisible] = useState(false);

    const isMobile = useUIStore(selectIsMobile);
    const { openAuthModal } = useUIStore(selectUIActions);

    const closeMenu = () => setVisible(false);

    useEffect(() => {
        if (!visible || isMobile) return;

        window.addEventListener('scroll', closeMenu, { passive: true });
        return () => {
            window.removeEventListener('scroll', closeMenu);
        };
    }, [visible, isMobile]);

    const items: MenuProps['items'] = useMemo(() => [
        {
            key: MENU_KEYS.HELP,
            label: (
                <div className={styles.helpItem}>
                    <QuestionCircleOutlined />
                    <span>Help Center</span>
                </div>
            ),
            disabled: true,
        },
        { type: 'divider' },
        ...(me ? [
            { key: MENU_KEYS.WISHLIST, label: 'Wishlist' },
            { key: MENU_KEYS.LOGOUT, label: 'Log out'},
        ] : [
            { key: MENU_KEYS.AUTH, label: 'Log in or sign up' }
        ])
    ], [me])

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        if (key === MENU_KEYS.AUTH) {
            openAuthModal();
        }
        if (key === MENU_KEYS.LOGOUT) {
            logout()
            navigate('/', { replace: true });
        }
        if (key === MENU_KEYS.WISHLIST) {
            navigate('/wishlist');
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Dropdown: {
                        paddingBlock: 8,
                        colorText: '#222222',
                        colorTextDisabled: '#b0b0b0',
                        fontFamily: 'Inter, sans-serif',
                        borderRadiusLG: 14
                    }
                }
            }}
        >
            <Dropdown
                menu={{
                    items,
                    onClick: handleMenuClick,
                }}
                trigger={['click']}
                classNames={{ root: styles.customDropdown }}
                placement='bottomRight'
                transitionName=''
                open={visible}
                onOpenChange={setVisible}
            >
                <button className={styles.userButton}>
                    <BurgerIcon />
                </button>
            </Dropdown>
        </ConfigProvider>
    )
}
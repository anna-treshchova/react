import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { ConfigProvider, Dropdown } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { useUIStore, selectIsMobile, selectUIActions } from '@/shared/model/uiStore';
import BurgerIcon from '@/shared/assets/icons/burger.svg?react';

import { useLogoutMutation } from '../../model';
import styles from './UserMenu.module.scss';

export const UserMenu = ({ me }) => {
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

    const items = useMemo(() => [
        {
            key: 'help',
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
            { key: 'wishlist', label: 'Wishlist' },
            { key: 'logout', label: 'Log out'},
        ] : [
            { key: 'auth', label: 'Log in or sign up' }
        ])
    ], [me])

    const handleMenuClick = ({ key }) => {
        if (key === 'auth') {
            openAuthModal();
        }
        if (key === 'logout') {
            logout()
            navigate('/', { replace: true });
        }
        if (key === 'wishlist') {
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
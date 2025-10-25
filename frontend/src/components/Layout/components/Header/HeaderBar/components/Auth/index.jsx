import {NavLink} from 'react-router';

import { Button, ConfigProvider } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import styles from './HeaderAuth.module.scss';

const HeaderAuth = () => {
    return (
        <div className={styles.authBox}>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            defaultHoverBorderColor: '#ff385b',
                            defaultHoverColor: '#ff385b',
                            defaultBackgroundColor: '#000000',
                        }
                    }
                }}
            >
                <Button
                    shape='circle'
                    size='large'
                    icon={<LoginOutlined />}
                    component={NavLink}
                    to='/about'
                />
            </ConfigProvider>
        </div>
    )
}

export default HeaderAuth;
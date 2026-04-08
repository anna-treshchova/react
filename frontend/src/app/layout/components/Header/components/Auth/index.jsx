import { NavLink } from 'react-router';
import { Button, ConfigProvider } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import styles from './Auth.module.scss';

const Auth = () => {
    return (
        <div className={styles.auth}>
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
                    to='/'
                />
            </ConfigProvider>
        </div>
    )
}

export default Auth;
import { Button, ConfigProvider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchButton = () => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: '#ff385b',
                        colorPrimaryHover: '#dc1261',
                        colorPrimaryBgHover:'#dc1261',
                    },
                },
            }}
        >
            <Button
                type='primary'
                size='large'
                shape='circle'
                htmlType='submit'
                style={{ width: '50px', height: '50px', marginLeft: '60px' }}
                icon={<SearchOutlined style={{ color: '#ffffff', fontSize: 22 }} />}
            />
        </ConfigProvider>
    )
}

export default SearchButton;

import { Card, Form, Input, Button, message} from 'antd'
import './index.scss';
import { useStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginStore } = useStore();
    const navigate = useNavigate();

    async function onFinish(value) {
        console.log(value);
        console.log('everything fine...');
        const { email, password } = value;
        try{
            await loginStore.getToken({ email, password });
            //redirect to main page
            navigate('/');
        } catch(e){
            message.error(e.response?.data?.message || 'Login Fail')
        }
    }

    return (
        <div className='login'>
            <Card className='login-container'>
                <Form 
                    validateTrigger={['onBlur']}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='email'
                        rules={[
                            {
                                required: true,
                                message:'Email Cannot Be Empty!'
                            },
                            {
                                pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                message: "Incorrect Email Format",
                                validateTrigger: 'onBlur'   
                            }
                        ]}
                    >
                        <Input size="large" placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message:'Password Cannot Be Empty!',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                        LOGIN
                        </Button>
                    </Form.Item>
                </Form>
             </Card>
         </div>
    )
}

export default Login;
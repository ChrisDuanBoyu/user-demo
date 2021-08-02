import { useCallback} from 'react'
import { Form ,Input,Button, message} from 'antd';
import { useHistory } from 'react-router-dom';
import { register } from '../services/user';
import { USER_TOKEN_KEY } from '../const';


 const Register = () => {
    const [form] = Form.useForm();
     const history = useHistory();
     
    const handleSubmit = useCallback(
        () => {
            form.validateFields().then(async (res) => {
                const { password, confirm_password, username } = res;
                if (confirm_password.trim() !== password.trim()) {
                    message.error('两次输入密码不一致');
                    
                } else {
                    try {
                        const { token } = await register({ username, password });
                        localStorage.setItem(USER_TOKEN_KEY, token);
                        message.success('注册成功');
                        history.push('/userinfo')
                    } catch (error) {
                        message.error('注册失败')
                    }
                    
                    
                    
                }
            }, () => { })
        },
        [form],
    )
    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}>
            <h1 style={{textAlign:'center'}}>注册</h1>
            <Form.Item
                label="用户名"
                name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="确认密码"
                name="confirm_password"
                rules={[{ required: true, message: '请输入确认密码' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button style={{marginRight:15}} onClick={handleSubmit} type="primary" >
                提交
                </Button>
                <Button  onClick={()=>history.push('/login')} >
                返回登录
                </Button>
            </Form.Item>
            </Form>

        
        
    )
}


export default Register
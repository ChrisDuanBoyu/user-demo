import  { useCallback, useState} from 'react'

import { Form,Input,Button, Spin, message} from 'antd'
import { useHistory } from 'react-router-dom';
import { login } from '../services/user';
import { USER_TOKEN_KEY } from '../const';
const Login = () => {


    const [form] = Form.useForm();
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const handleSubmit = useCallback(
        () => {
            form.validateFields().then(async(value) => {
               
                try {
                    setLoading(true);
                    const { token } = await login(value);
                    localStorage.setItem(USER_TOKEN_KEY, token);
                    setLoading(false)
                    message.success('登录成功')
                    history.push('/userinfo')
                } catch (error) {
                    setLoading(false)
                }
               
                
            }, () => { })
        },
        [form,history],
    )
    return (
        <Spin spinning={loading }>
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}>
            <h1 style={{textAlign:'center'}}>登录</h1> 
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
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button onClick={handleSubmit} style={{marginRight:15}} type="primary" >
                    登录
                </Button>
                <Button onClick={()=>history.push('/register')} >
                    注册
                </Button>
            </Form.Item>
            </Form>
            </Spin> 

        
        
    )
}

Login.propTypes = {

}

export default Login

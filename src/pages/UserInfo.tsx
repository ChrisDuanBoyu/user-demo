import { useEffect, useState,useCallback } from 'react'
import {Spin ,Col,Row,Button} from 'antd'
import { getUserInfo, User } from '../services/user';
import moment from 'moment';

import { USER_TOKEN_KEY } from '../const';
import { useHistory } from 'react-router';

function formatDate(date?: number) {

    return date? moment(date).format('YYYY-MM-DD HH:MM'):''
}

const UserInfo =  () => {

    const [loading, setloading] = useState(false);
    const [userInfo, setUserInfo] = useState<User>({username:''})
    const history = useHistory();

    const fetchUser = useCallback(async () => {
        try {
            setloading(true);
            const user =  await getUserInfo();
            setUserInfo(user);
            setloading(false);
        } catch (error) {
            setloading(false);
        }
       
    },[])
    const onLogout = useCallback(
        () => {
            // 清除本地token 跳转到登录页
            localStorage.removeItem(USER_TOKEN_KEY);
            history.push('/login');
        },
        [history],
    )
    useEffect(() => {
        fetchUser();
        
    }, [])
    return (
        <Spin spinning={ loading}>
            <div style={{ width: '300px' }} >
                <h1 style={{textAlign:'center'}} >用户信息</h1>
                <Row gutter={[10,40]}>
                    <Col span={ 8}>用户名:</Col>
                    <Col span={ 16}>{ userInfo.username}</Col>
                   
                </Row>
                <Row gutter={[10,40]}>
                    <Col span={8}>注册时间:</Col>
                    <Col> {formatDate(userInfo.register_time)} </Col>
                </Row>
                <Button type='primary' style={{marginTop:20}} onClick={onLogout}>注销</Button>
                
            </div>
        </Spin>
       
    )
}

export default UserInfo

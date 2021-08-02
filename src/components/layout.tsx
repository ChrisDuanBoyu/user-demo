import { Card } from 'antd'





const Layout :React.FC= ({children}) => {
    return (
        <Card
            
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center',
            position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',width:600,height:400
        }}>
            { children}
        </Card>
    )
}

export default Layout

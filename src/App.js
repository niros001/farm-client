import React, {useCallback} from 'react'
import styled from 'styled-components';
import {notification, Button, Input, Form} from 'antd';
import {KeyOutlined, MailOutlined} from '@ant-design/icons';
import {useMutation} from '@apollo/client';
import * as mutations from './graphql/mutations';
import OrdersManagement from './components/orders-management/OrdersManagement';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const App = () => {
    const [form] = Form.useForm();

    const [loginUser, {loading, error, data}] = useMutation(mutations.LOGIN_MUTATION);
    const token = data?.signin?.token;

    const onFinish = useCallback(() => {
        loginUser({variables: form.getFieldsValue()})
            .then((resp) => console.log({resp}))
            .catch(err => notification.error(err))
    }, [form, loginUser])

    if (!!token) return <OrdersManagement />
    return (
        <Container>
            <Form
                name="login-form"
                form={form}
                layout="vertical"
                // initialValues={{email: '', password: ''}}
                onFinish={onFinish}
                onFieldsChange={() => form.getFieldsError()}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input addonAfter={<MailOutlined />} allowClear placeholder="Email..." />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password addonAfter={<KeyOutlined />} allowClear placeholder="password..."  />
                </Form.Item>
                <Form.Item>
                    <Button style={{width: 300}} type="primary" htmlType="submit" disabled={loading} loading={loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Container>
    )
}

export default App;

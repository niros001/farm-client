import React, {useCallback} from 'react'
import {connect} from 'react-redux'
import {Modal, Input, Form, Button, notification} from 'antd'
import {MailOutlined,  KeyOutlined} from '@ant-design/icons'
import {useMutation} from '@apollo/client';
import * as mutations from '../../graphql/mutations';
import * as userActions from '../../store/actions/userActions'

const LoginModal = ({visible, onCancel, store, signin}) => {
    console.log({store})
    const [form] = Form.useForm();
    const [loginUser, {loading, error, data}] = useMutation(mutations.LOGIN_MUTATION);
    const token = data?.signin?.token;
    const onFinish = useCallback(() => {
        signin(loginUser({variables: form.getFieldsValue()})
            .then((resp) => signin(resp))
            .catch(err => notification.error(err)))
    }, [loginUser, form, signin]);
    return (
        <Modal
            style={{direction: 'ltr'}}
            title="Login"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            okText="Login"
            centered
        >
            <Form
                name="login-form"
                form={form}
                layout="vertical"
                initialValues={{email: '', password: ''}}
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
                    <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default connect(store => store, userActions)(LoginModal);

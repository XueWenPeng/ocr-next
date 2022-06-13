import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Form, Input, Button, Spin, message } from 'mishu-ui';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import MD5 from 'crypto-js/md5';
import { useNavigate } from 'react-router-dom';
import logoImage from 'Assets/images/loginLogo.png';
import { pwdLoginApi, PwdModeParams, sendMsgApi, msgLoginApi, MsgModePrams, LoginRes } from './services';
import './index.less';

const Login = () => {
  const navigator = useNavigate();
  const timerRef = useRef<any>(null);
  const [pwdForm] = Form.useForm();
  const [msgForm] = Form.useForm();
  const [loginMode, setLoginMode] = useState<string>('pwd');
  const [loading, setLoading] = useState<boolean>(false);
  const [msgCDTime, setMsgCDTime] = useState<number>(0);

  const loginSuccess = (res: LoginRes) => {
    setLoading(false);
    if (res?.token) {
      localStorage.setItem('token', res.token);
      localStorage.removeItem('user');
      navigator('/');
    }
  };

  const loginByPwd = async (values: PwdModeParams) => {
    setLoading(true);
    const res = await pwdLoginApi({ ...values, password: MD5(values.password).toString() });
    loginSuccess(res);
  };

  const sendMsg = async () => {
    const account = msgForm.getFieldValue('account');
    if (account) {
      const res = await sendMsgApi({ account });
      if (res?.sendStatus === 0) {
        message.success('发送成功！');
        setMsgCDTime(60);
        timerRef.current = setInterval(() => {
          setMsgCDTime((pre) => pre - 1);
        }, 1000);
      }
    } else {
      try {
        await msgForm.validateFields();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const loginByMsg = async (values: MsgModePrams) => {
    setLoading(true);
    const res = await msgLoginApi(values);
    loginSuccess(res);
  };

  useEffect(() => {
    if (msgCDTime === 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [msgCDTime]);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    },
    [],
  );

  return (
    <div className='flex-center h-100'>
      <Row className='login-box'>
        <Col span={12}>
          <img src={logoImage} alt='login logo' className='login-logo' />
        </Col>
        <Col span={12}>
          <Spin spinning={loading}>
            <div className='login-form-box'>
              <span className='login-form-title'>医疗智能审核系统</span>
              {loginMode === 'pwd' && (
                <Form onFinish={loginByPwd} className='w-100' form={pwdForm}>
                  <Form.Item name='account' rules={[{ required: true, message: '请输入用户名！' }]}>
                    <Input addonBefore={<UserOutlined />} placeholder='用户名' />
                  </Form.Item>
                  <Form.Item name='password' rules={[{ required: true, message: '请输入密码！' }]}>
                    <Input.Password addonBefore={<LockOutlined />} placeholder='密码' />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType='submit' className='w-100'>
                      登录
                    </Button>
                  </Form.Item>
                  <div className='link-text w-100 text-align-r' onClick={() => setLoginMode('msg')}>
                    使用短信验证码登录 →
                  </div>
                </Form>
              )}
              {loginMode === 'msg' && (
                <Form onFinish={loginByMsg} className='w-100' form={msgForm}>
                  <Form.Item name='account' rules={[{ required: true, message: '请输入用户名！' }]}>
                    <Input addonBefore={<UserOutlined />} placeholder='用户名' />
                  </Form.Item>
                  <Form.Item
                    name='verifyCode'
                    rules={msgForm.getFieldValue('account') ? [{ required: true, message: '请输入验证码！' }] : []}
                  >
                    <Input
                      addonBefore={<LockOutlined />}
                      addonAfter={
                        msgCDTime === 0 ? (
                          <div className='link-text' onClick={sendMsg}>
                            发送验证码
                          </div>
                        ) : (
                          <div className='tip-text'>{msgCDTime}</div>
                        )
                      }
                      placeholder='短信验证码'
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType='submit' className='w-100'>
                      登录
                    </Button>
                  </Form.Item>
                  <div className='link-text w-100 text-align-r' onClick={() => setLoginMode('pwd')}>
                    使用密码登录 →
                  </div>
                </Form>
              )}
            </div>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default Login;

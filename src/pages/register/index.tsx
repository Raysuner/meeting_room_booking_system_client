import { Form, Button, Input, message } from "antd";
import "./index.less";
import { sendCaptcha, register } from "../../api";
import { useNavigate } from "react-router-dom";
import { IRegisterParams } from "../../types";

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  wrapperCol: { span: 20, offset: 4 },
};

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (value: IRegisterParams) => {
    try {
      const { data } = await register(value);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      message.success("注册成功");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const onCaptchaClick = async () => {
    const address = form.getFieldValue("email");
    if (!address) {
      message.error("请填写邮箱号码");
      return;
    }
    try {
      await sendCaptcha({
        address,
      });
      message.success("已发送验证码");
    } catch (error) {
      message.error("发送证码失败");
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-page">
        <h1 className="page-title">会议室预定系统</h1>
        <Form
          {...layout1}
          form={form}
          className="register-form"
          labelAlign="left"
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name={"username"}
            required
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name={"password"}
            required
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name={"email"}
            required
            rules={[{ required: true, message: "请输入邮箱" }]}
          >
            <Input />
          </Form.Item>
          <div className="captcha-wrapper">
            <Form.Item
              label="验证码"
              name={"captcha"}
              required
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
            <Button
              className="captcha-btn"
              type="primary"
              onClick={onCaptchaClick}
            >
              获取验证码
            </Button>
          </div>
          <Form.Item {...layout2}>
            <a href="/login">已有账号？请登录</a>
          </Form.Item>
          <Form.Item {...layout2}>
            <Button className="btn" block type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

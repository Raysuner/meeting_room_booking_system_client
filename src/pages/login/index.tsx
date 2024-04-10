import "./index.less";
import { Form, Input, Button, message } from "antd";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import { ILoginParams } from "../../types";

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  wrapperCol: { span: 20, offset: 4 },
};

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (value: ILoginParams) => {
    try {
      const { data } = await login(value);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      message.success("登录成功");
      navigate("/");
    } catch (error) {
      if (typeof error === "string") {
        message.error(error);
      }
      console.error(error);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-page">
        <h1 className="page-title">会议室预约系统</h1>
        <Form
          {...layout1}
          className="login-form"
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
            name="password"
            required
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...layout2}>
            <div className="links">
              <div className="link">
                <a href="/register">创建账号</a>
              </div>
              <div className="link">
                <a href="/update-password">忘记密码</a>
              </div>
            </div>
          </Form.Item>
          <Form.Item {...layout2} labelAlign="right">
            <div className="btn-wrapper">
              <Button block type="primary" htmlType="submit">
                提交
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

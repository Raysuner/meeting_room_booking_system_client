import "./index.less";
import { Form, Button, Input, message } from "antd";
import { sendCaptcha, updatePassword } from "../../api";
import { useNavigate } from "react-router-dom";
import { IUpdatePassword } from "../../types";

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

  const onFinish = async (value: IUpdatePassword) => {
    try {
      await updatePassword(value);
      message.success("更新密码成功");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onSendCaptcha = async () => {
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
    <div className="update-password-page-wrapper">
      <div className="update-password-page">
        <h1 className="page-title">会议室预定系统</h1>
        <Form
          {...layout1}
          form={form}
          className="update-password-form"
          labelAlign="left"
          onFinish={onFinish}
        >
          <Form.Item
            label="邮箱"
            name={"email"}
            required
            rules={[{ required: true, message: "请输入邮箱" }]}
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
              onClick={onSendCaptcha}
            >
              获取验证码
            </Button>
          </div>
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

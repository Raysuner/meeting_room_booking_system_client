import { Form, Button, Input } from "antd";

export default function Register() {
  const onFinish = (value) => {
    console.log(value);
  };

  return (
    <div className="register-page-wrapper">
      <div className="page-title">会议室预定系统</div>
      <Form
        className="register-form"
        labelAlign="right"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 3 }}
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
        <Form.Item wrapperCol={{ span: 3, offset: 3 }}>
          <Button className="btn" type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

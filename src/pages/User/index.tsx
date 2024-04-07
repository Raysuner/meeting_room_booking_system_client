import { useEffect } from "react";
import "./index.less";
import { Button, Form, Input } from "antd";
import { getUserInfo } from "../../api";

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  wrapperCol: { span: 20, offset: 4 },
};

export default function User() {
  const [form] = Form.useForm();

  const onFinish = (value) => {
    console.log(value);
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await getUserInfo();
      form.setFieldsValue(res.data);
    };
    fetcher();
  }, []);

  return (
    <div className="user-page-wrapper">
      <div className="user-page">
        <h2>个人信息</h2>
        <aside className="side-bar">
          <div className="avatar">
            <img src="#" alt="" />
          </div>
        </aside>
        <section className="content">
          <Form
            {...layout1}
            className="user-form"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item label="用户名" name="username">
              <Input disabled />
            </Form.Item>
            <Form.Item label="邮箱" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="电话号码" name="phoneNumber">
              <Input />
            </Form.Item>
            <Form.Item {...layout2}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    </div>
  );
}

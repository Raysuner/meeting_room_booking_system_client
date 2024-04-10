import { useEffect } from "react";
import "./index.less";
import { Button, Form, Input, message } from "antd";
import { getUserInfo, updateUserInfo } from "../../api";
import ImageUpload from "../ImageUpload";

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  wrapperCol: { span: 20, offset: 4 },
};

export default function User() {
  const [form] = Form.useForm();

  const onFinish = async (value) => {
    await updateUserInfo(value);
    message.success("更新成功");
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await getUserInfo();
      form.setFieldsValue(res.data);
      console.log(res.data);
    };
    fetcher();
  }, []);

  return (
    <div className="user-page-wrapper">
      <div className="user-page">
        <h2 className="header">个人信息</h2>
        <section className="body">
          <div className="avatar"></div>
          <Form
            {...layout1}
            className="user-form"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="头像"
              name="avatar"
              getValueFromEvent={(val) => `http://localhost:3000/${val.path}`}
            >
              <ImageUpload />
            </Form.Item>
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
              <Button block type="primary" htmlType="submit">
                确认
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    </div>
  );
}

import { Form, Input, message, Modal } from 'antd';
import { toAddOnlyEmployee } from 'hooks/useUsers';
import { lang } from 'language/en';
import { CollectionCreateFormProps, UserValues } from './types';

export const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={lang.addUser.title}
      okText={lang.addUser.okText}
      cancelText={lang.addUser.cancelText}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values: UserValues) => {
            toAddOnlyEmployee(values);
            form.resetFields();
            message.success(lang.addUser.succeess, 5);
            onCreate(values);
          })
          .catch(() => {
            message.error(lang.addUser.succeess, 5);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          label={lang.userInfo.firstName}
          name="first_name"
          rules={[{ required: true, message: lang.addUser['firstName-validation'] }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={lang.userInfo.lastName}
          name="last_name"
          rules={[{ required: true, message: lang.addUser['lastName-validation'] }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label={lang.userInfo.email}
          rules={[
            {
              type: 'email',
              required: true,
              message: lang.addUser['email-validation'],
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

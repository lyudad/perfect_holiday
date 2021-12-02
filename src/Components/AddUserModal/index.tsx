import { Form, Input, message, Modal, Select } from 'antd';
import { toAddOnlyEmployee } from 'hooks/useUsers';
import { lang } from 'language/en';
import { CollectionCreateFormProps, UserValues } from './types';
import store from 'Redux/store';
import { Role } from 'constants/constants';

const { Option } = Select;

export const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
    const state = store.getState();
    const role = state.person.user.role;
    const InitialState = {
      canSelectRoleInModal: (role === Role.SUPER)
    };
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
        {
          (InitialState.canSelectRoleInModal)
          &&
          <Form.Item
            label={lang.superAdmin.roleTitle}
            name="role"
          >
            <Select
              defaultValue="employee"
            >
              <Option value="admin" key="id">
                Admin
              </Option>
              <Option value="employee" key="id">
                Employee
              </Option>
            </Select>
          </Form.Item>
        }
      </Form>
    </Modal>
  );
};

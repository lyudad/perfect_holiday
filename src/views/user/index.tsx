import { useState } from 'react';
import 'antd/dist/antd.css';
import { lang } from 'language/en';
import { Row, Input, Form, Modal, Button, Table, Select } from 'antd';
import './index.css'
import {
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledFormItem,
  StyledDivContent,
  StyledDivVacationInfo,
  SelectBlock,
  StyledModalContent,
  StyledInputContent,
} from './styles';
import { columns, sellectItemColor } from './const';
import Layout from './layout';
import Sidebar from '../../Components/Sidebar';
import shortid from 'shortid';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { type } from 'os';
const { Option } = Select;

const data = [
  {
    key: 'PQBVhT9Ve',
    startDate: '16th Nov 2021',
    endDate: '26th Dec 2021',
    status: 'approved',
    type: 'vacation',
  },
  {
    key: 'JrL0fbUFW',
    startDate: '16th Nov 2021',
    endDate: '26th Dec 2021',
    status: 'approved',
    type: 'vacation',
  },
  {
    key: 'vpL0AMwK1y',
    startDate: '16th Nov 2021',
    endDate: '26th Dec 2021',
    status: 'pending',
    type: 'vacation',
  },
  {
    key: 'A6xDpRGOm',
    startDate: '16th Nov 2021',
    endDate: '26th Dec 2021',
    status: 'declined',
    type: 'sick leave',
  },
];

const UserView = (): JSX.Element => {
  type Data = typeof data;

  type Type = string;

  type Vacation = {
    startDate: Date;
    endDate: Date;
  };

  // eslint-disable-next-line no-unused-vars
  const [request, setRequest] = useState<Data>(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<Type>('vacation');

  const { control, handleSubmit, watch } = useForm<Vacation>();
  const watchAll = watch();
  const today = new Date();

  const onChangeType = (type: string) => {
    setSelectedType(type);
  };

  const onSubmit: SubmitHandler<Vacation> = (data: Vacation) => {
    const newStartDate = new Date(data.startDate);
    const firstDate = newStartDate.toLocaleDateString().slice(0, 10);

    const newEndDate = new Date(data.endDate);
    const endDate = newEndDate.toLocaleDateString().slice(0, 10);
    onChangeType(selectedType);
    const item = {
      key: shortid.generate(),
      startDate: firstDate,
      endDate: endDate,
      status: 'pending',
      type: selectedType,
    };
    console.log(item);

    setRequest(prevState => [item, ...prevState]);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
 const SelectColor = (record:any) =>
 {return sellectItemColor(record.status) || ''
 }

  return (
    <Layout>
      <StyledLayout>
        {Modal && (
          <Modal
            onCancel={toggleModal}
            visible={isModalVisible}
            wrapClassName="reservation_modal"
            width={600}
            footer={null}
          >
            <div className="reserv_message">Please choose dates of reservation.</div>
            <Form onSubmitCapture={handleSubmit(onSubmit)}>
              <StyledInputContent>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        selectsStart
                        dateFormat="dd.MM.yyyy"
                        startDate={watchAll.startDate}
                        endDate={watchAll.endDate}
                        maxDate={watchAll.endDate}
                        minDate={today}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholderText="Start date"
                      />
                    );
                  }}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        selectsEnd
                        dateFormat="dd.MM.yyyy"
                        startDate={watchAll.startDate}
                        endDate={watchAll.endDate}
                        minDate={watchAll.startDate}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholderText="Start date"
                      />
                    );
                  }}
                />
                <SelectBlock
                  size="middle"
                  defaultValue="vacation"
                  onChange={() => setSelectedType(type)}
                  value={selectedType}
                >
                  <Option value="vacation">Vacation</Option>
                  <Option value="sickleave">Sick leave</Option>
                </SelectBlock>
              </StyledInputContent>

              <StyledModalContent>
                <Button onClick={toggleModal}>Cancel</Button>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Confirm Reservation
                  </Button>
                </Form.Item>
              </StyledModalContent>
            </Form>
          </Modal>
        )}
        <Sidebar />
        <StyledContent>
          <StyledDivContent className="site-layout-background">
            <Row>
              <Form name="VacationForm" layout="horizontal" size="large">
                <StyledFormItem
                  name="FirstName"
                  rules={[
                    {
                      type: 'string',
                      required: true,
                      message: `${lang.username['firstName-validation']}`,
                    },
                  ]}
                >
                  <Input placeholder="FirstName" />
                </StyledFormItem>

                <StyledFormItem
                  name="LastName"
                  rules={[
                    {
                      type: 'string',
                      required: true,
                      message: `${lang.username['lastName-validation']}`,
                    },
                  ]}
                >
                  <Input placeholder="LastName" />
                </StyledFormItem>
              </Form>
            </Row>
            <Row>
              <StyledDivVacationInfo>
                <strong>2 sick leave</strong>
              </StyledDivVacationInfo>
              <StyledDivVacationInfo>
                <strong>14 vacation days</strong>
              </StyledDivVacationInfo>
            </Row>
          </StyledDivContent>
          <StyledButton
            type="primary"
            shape="round"
            htmlType="submit"
            size="large"
            onClick={() => setIsModalVisible(true)}
          >
            +
          </StyledButton>
          <Table columns={columns} dataSource={data} size="large"
                 rowClassName={SelectColor}/>
        </StyledContent>
      </StyledLayout>
    </Layout>
  );
};
export default UserView;

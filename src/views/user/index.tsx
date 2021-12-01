import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { lang } from 'language/en';
import { Row, Input, Form, Modal, Button, Table, Select } from 'antd';
import './index.css';
import {
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledDivNameInfo,
  StyledDivContent,
  StyledDivVacationInfo,
  SelectBlock,
  StyledModalContent,
  StyledInputContent,
} from './styles';
import { columns, showCurrentDate } from './const';
import { sellectItemColor } from 'constants/constants';
import Layout from './layout';
import Sidebar from 'Components/Sidebar';
import { useRouteMatch } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { bookigRestDays } from 'hooks/useUsers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IMatchParams } from 'views/AdminView/types';
import { TBookkHoliday } from 'hooks/types';
import { useSelector } from 'react-redux';
import userSelectors from 'Redux/users/userSelectors';
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

type Vacation = {
  startDate: Date;
  endDate: Date;
};

const UserView = (): JSX.Element => {
  const name = useSelector(userSelectors.getUserName);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState<string>('vacation');
  const { control, handleSubmit, watch } = useForm<Vacation>();

  const watchAll = watch();
  const today = new Date();

  const newStartDate = new Date(watchAll.startDate);
  const newEndDate = new Date(watchAll.endDate);

  const userId = useRouteMatch<IMatchParams>().params.id;

  const onChangeType = (type: any) => {
    setType(type);
  };

  const start_date = showCurrentDate(newStartDate);
  const end_date = showCurrentDate(newEndDate);

  const days: TBookkHoliday = { type, start_date, end_date };

  const onSubmit: SubmitHandler<Vacation> = () => {
    onChangeType(type);
    bookigRestDays(days, userId);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const SelectColor = (record: { status: string }) => {
    return sellectItemColor(record.status) || '';
  };

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
                  onSelect={type => onChangeType(type)}
                  value={type}
                >
                  <Option value="vacation">Vacation</Option>
                  <Option value="sick">Sick leave</Option>
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
              <StyledDivNameInfo>
                <strong>Welcome,{name}</strong>
              </StyledDivNameInfo>
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
          <Table
            columns={columns}
            dataSource={data}
            size="large"
            rowClassName={SelectColor}
          />
        </StyledContent>
      </StyledLayout>
    </Layout>
  );
};
export default UserView;

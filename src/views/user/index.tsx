import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { lang } from 'language/en';
import { Row, Form, Modal, Button, Table, Select } from 'antd';
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
import { bookigRestDays, getUserRequestDays } from 'hooks/useUsers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IMatchParams } from 'views/AdminView/types';
import { TBookkHoliday } from 'hooks/types';

const { Option } = Select;

type Vacation = {
  startDate: Date;
  endDate: Date;
};

const UserView = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState<string>('vacation');
  const { control, handleSubmit, watch } = useForm<Vacation>();

  const watchAll = watch();
  const today = new Date();

  const newStartDate = new Date(watchAll.startDate);
  const newEndDate = new Date(watchAll.endDate);

  const userId = useRouteMatch<IMatchParams>().params.id;
  const { data } = getUserRequestDays(userId);

  const start_date = showCurrentDate(newStartDate);
  const end_date = showCurrentDate(newEndDate);

  const days: TBookkHoliday = { type, start_date, end_date };

  const onChangeType = (type: any) => {
    setType(type);
  };

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
          {data?.map(({ first_name, available_sick_days, available_vacation }) => (
            <StyledDivContent className="site-layout-background">
              <Row>
                <StyledDivNameInfo>
                  <strong>Welcome, {first_name}</strong>
                </StyledDivNameInfo>
              </Row>
              <Row>
                <StyledDivVacationInfo>
                  <strong>{available_sick_days} sick leave</strong>
                </StyledDivVacationInfo>
                <StyledDivVacationInfo>
                  <strong>{available_vacation} vacation days</strong>
                </StyledDivVacationInfo>
              </Row>
            </StyledDivContent>
          ))}

          <StyledButton
            type="primary"
            shape="round"
            htmlType="submit"
            size="large"
            onClick={() => setIsModalVisible(true)}
          >
            +
          </StyledButton>
          {data?.map(({ vacations }: any) => (
            <Table
              columns={columns}
              dataSource={vacations}
              size="large"
              rowClassName={SelectColor}
            />
          ))}
        </StyledContent>
      </StyledLayout>
    </Layout>
  );
};
export default UserView;

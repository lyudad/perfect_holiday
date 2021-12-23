import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Modal, Table } from 'antd';
import './index.css';
import {
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledDivNameInfo,
  StyledDivContent,
  StyledDivVacationInfo,
} from './styles';
import { columns, showCurrentDate } from './const';
import { sellectItemColor } from 'constants/constants';
import Layout from './layout';
import Sidebar from 'Components/Sidebar';
import { SubmitHandler, useForm } from 'react-hook-form';
import { bookigRestDays, getUserRequestDays } from 'hooks/useUsers';
import 'react-datepicker/dist/react-datepicker.css';
import { TBookkHoliday, User } from 'hooks/types';
import store from 'Redux/store';
import ModalWindow from './modal';
import { Vacation } from './types';

const UserView = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('vacation');
  const [data, setData] = useState<User[]>();
  const { watch } = useForm<Vacation>();
  const watchAll = watch();

  const state = store.getState();

  const userId = state.person.user.id;
  const name = state.person.user.name;
  const sick = state.person.user.sickDays;
  const vacation = state.person.user.vacationDays;

  useEffect(() => {
    getUserRequestDays(userId)
      .then(({ data }) => {
        setData(data);
      })
      .catch(error => console.log(error));
  }, []);

  const newStartDate = new Date(watchAll.startDate);
  const newEndDate = new Date(watchAll.endDate);

  const start_date = showCurrentDate(newStartDate);
  const end_date = showCurrentDate(newEndDate);

  const days: TBookkHoliday = { type, start_date, end_date };

  const onSubmit: SubmitHandler<Vacation> = () => {
    setType(type);
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
            <ModalWindow onClose={onSubmit} />
          </Modal>
        )}
        <Sidebar />
        <StyledContent>
          <StyledDivContent className="site-layout-background">
            <Row>
              <StyledDivNameInfo>
                <strong>Welcome, {name}</strong>
              </StyledDivNameInfo>
            </Row>
            <Row>
              <StyledDivVacationInfo>
                <strong>{sick} sick leave</strong>
              </StyledDivVacationInfo>
              <StyledDivVacationInfo>
                <strong>{vacation} vacation days</strong>
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
          {data?.map(({ vacations }) => (
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

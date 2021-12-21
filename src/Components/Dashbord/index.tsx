import { Button, Space, Table, message, Modal, Form } from 'antd';
import { StyledLayout, StyledContent } from './styles';
import Sidebar from 'Components/Sidebar';
import {
  useAllNotApprovedRestDays,
  toApprovedOrDisapproveRestDay,
  toEditRestDays,
} from 'hooks/useUsers';
import Loading from 'Components/Loading';
import { lang } from 'language/en';
import { APPROVED, DECLINED, CHANGED } from 'constants/statuses';
import { IUserId, TEditRestDays, TVacationRestDays, IUserDay } from 'hooks/types';
import { StyledInputContent, StyledModalContent, StyledDatePicker  } from 'views/user/styles'
import { Controller, useForm } from 'react-hook-form';
import { showCurrentDate } from 'views/user/const';
import { useState } from 'react';

const { Column } = Table;

const Dashbord = (): JSX.Element => {
  const { error, isLoading, data, refetch } = useAllNotApprovedRestDays();
  const [firstDate,setFirstDate]= useState<string>('')
  const [lastDate,setLastDate]= useState<string>('')
  const [typeVac, setTypeVac]= useState<string>('')
  const [typeVacEdit, setTypeVacEdit]= useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { control, handleSubmit, watch } = useForm<TVacationRestDays>();
  const [ids, setIds] = useState<TEditRestDays>();

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <h1>Error: {error.message}</h1>;
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const watchAll = watch();
  const today = new Date();

  const newStartDate = new Date(watchAll.startDate);
  const newEndDate = new Date(watchAll.endDate);

  const start_date = showCurrentDate(newStartDate);
  const end_date = showCurrentDate(newEndDate);
  const dateDiffInDays = (a: Date, b: Date)=> {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / MS_PER_DAY);
  }
  const putStatusApproved = (dataIndex: string, key: IUserDay) => {
    const difference = dateDiffInDays(new Date(firstDate), new Date(lastDate));
    console.log(new Date(firstDate).getDate(),new Date(lastDate).getDate(),difference,key.type)
    toApprovedOrDisapproveRestDay({
      status: APPROVED,
      id: key.id,
      userId: dataIndex,
      diffDays: difference,
      type: typeVac
    })
      .then(() => message.loading(lang.info.loading))
      .catch(() => message.error(lang.dashboard.failMessageStatusApproved))
      .finally(() => {
        return refetch(), console.log('diff'+difference);
      });
  };

  const putStatusDeclined = (dataIndex: string, key: IUserId) => {
    toApprovedOrDisapproveRestDay({
      status: DECLINED,
      id: key.id,
      userId: dataIndex,
      diffDays: 0,
      type: typeVac,
    })
      .then(() => message.loading(lang.info.loading))
      .catch(() => message.error(lang.dashboard.failMessageStatusDeclined))
      .finally(() => {
        return refetch(), message.success(lang.dashboard.messageStatusDeclined);
      });
  };

  const onSubmit = () => {
    const difference = dateDiffInDays(new Date(start_date), new Date(end_date));
    console.log(difference,typeVacEdit)
    toEditRestDays({
      ...ids,
      status: CHANGED,
      start_date: start_date,
      end_date: end_date,
      diffDays: difference,
      type: typeVacEdit
    })
      .then(() => message.loading(lang.info.loading))
      .catch(() => message.error(lang.dashboard.failMessageStatusEditing))
      .finally(() => {
        return refetch(), message.success(lang.dashboard.messageStatusEditing);
      });
    toggleModal()
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <StyledLayout>
      <Modal
        onCancel={toggleModal}
        visible={isModalVisible}
        wrapClassName="reservation_modal"
        width={600}
        footer={null}
      >
        <div className="reserv_message">{lang.modalCalendar.topText}</div>
        <Form onSubmitCapture={handleSubmit(onSubmit)}>
          <StyledInputContent>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => {
                return (
                  <StyledDatePicker
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
                  <StyledDatePicker
                    selectsEnd
                    dateFormat="dd.MM.yyyy"
                    startDate={watchAll.startDate}
                    endDate={watchAll.endDate}
                    minDate={watchAll.startDate}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholderText="End date"
                  />
                );
              }}
            />
          </StyledInputContent>

          <StyledModalContent>
            <Button onClick={toggleModal}>{lang.modalCalendar.cancelButton}</Button>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {lang.modalCalendar.confirmButton}
              </Button>
            </Form.Item>
          </StyledModalContent>
        </Form>
      </Modal>
      <Sidebar />
      <StyledContent>
        <Table dataSource={data} pagination={{ pageSize: 10 }}>
          <Column
            title={lang.dashboard.userFirstName}
            dataIndex={['user', 'first_name']}
            key="id"
          />
          <Column
            title={lang.dashboard.userLastName}
            dataIndex={['user', 'last_name']}
            key="id"
          />
          <Column
            title={lang.dashboard.startDateTitle}
            dataIndex="start_date"
            key="id"
          />
          <Column
            title={lang.dashboard.endDateTitle}
            dataIndex="end_date"
            key="id"
          />
          <Column title={lang.dashboard.typeTitle} dataIndex="type" key="id" />
          <Column
            title={lang.dashboard.actionTitle}
            dataIndex={['user', 'id']}
            key="id"
            defaultFilteredValue={['user', 'userId']}
            render={(dataIndex: string, key: IUserDay) => (
              <Space size="middle">

                <Button
                  htmlType="submit"
                  type="link"
                  onClick={() => {
                    console.log('------ ',key.start_date,key.start_date,key.type)
                    setFirstDate(key.start_date);
                    setLastDate(key.end_date);
                    setTypeVac(key.type)
                    console.log(firstDate,lastDate);
                    putStatusApproved(dataIndex, key);}}
                >
                  {lang.dashboard.approveButton}
                </Button>
                <Button
                  htmlType="submit"
                  type="link"
                  onClick={() =>
                  {
                    putStatusDeclined(dataIndex, key)}}
                >
                  {lang.dashboard.declineButton}
                </Button>
                <Button
                  htmlType="submit"
                  type="link"
                  onClick={() => {
                    setTypeVacEdit(key.type)
                    setIsModalVisible(true),
                      setIds({ userId: dataIndex, id: key.id });
                  }}
                >
                  {lang.dashboard.editButton}
                </Button>
              </Space>
            )}
          />
        </Table>
      </StyledContent>
    </StyledLayout>
  );
};

export default Dashbord;
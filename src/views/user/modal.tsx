import { Form, Button, Select } from 'antd';
import { TBookkHoliday, THoliday, User } from 'hooks/types';
import { getUserRequestDays, bookigRestDays } from 'hooks/useUsers';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import store from 'Redux/store';
import {
  daysIntoYear,
  howManyPassSickDays,
  howManyPassVacationDays,
  showCurrentDate,
} from './const';
import { SelectBlock, StyledInputContent, StyledModalContent } from './styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TypeRestDay, Vacation } from './types';
import { DECLINED } from 'constants/statuses';
const { Option } = Select;

const ModalWindow = ({ onClose }: any) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('vacation');
  const [data, setData] = useState<User[]>();
  const { control, handleSubmit, watch } = useForm<Vacation>();
  const state = store.getState();

  const availableVacationDays = state.person.user.vacationDays;

  const userId = state.person.user.id;

  useEffect(() => {
    getUserRequestDays(userId)
      .then(({ data }) => {
        setData(data);
      })
      .catch(error => console.log(error));
  }, []);

  const watchAllDate = watch();
  const today = new Date();

  const newStartDate = new Date(watchAllDate.startDate);
  const newEndDate = new Date(watchAllDate.endDate);

  const start_date = showCurrentDate(newStartDate);
  const end_date = showCurrentDate(newEndDate);

  const getNumberOfDayInYear =
    daysIntoYear(newStartDate) +
    (type === TypeRestDay.VACATION ? availableVacationDays : 0);
  const getYear = newStartDate.getFullYear();
  const getMaxDate = new Date(getYear, 0, getNumberOfDayInYear);

  const days: TBookkHoliday = { type, start_date, end_date };

  const onSubmit: SubmitHandler<Vacation> = () => {
    setType(type);
    bookigRestDays(days, userId);
    toggleModal();
    onClose();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  let lastSickDay: Date;
  let lastVacationDay: Date;

  const userVacations = data?.find(user => user.vacations)?.vacations;
  const sickDays = userVacations?.filter(
    val => val.type === TypeRestDay.SICK && val.status !== DECLINED,
  );
  const vacationDays = userVacations?.filter(
    val => val.type === TypeRestDay.VACATION && val.status !== DECLINED,
  );

  if (sickDays === undefined || sickDays.length <= 1) {
    lastSickDay = today;
  } else {
    lastSickDay = new Date(
      sickDays.sort(
        (val1: THoliday, val2: THoliday) =>
          Number(new Date(val1.end_date)) - Number(new Date(val2.end_date)),
      )[sickDays.length - 1].end_date,
    );
    lastSickDay.setDate(lastSickDay.getDate() + howManyPassSickDays);
  }
  if (vacationDays === undefined || vacationDays.length <= 1) {
    lastVacationDay = today;
  } else {
    lastVacationDay = new Date(
      vacationDays.sort(
        (val1: THoliday, val2: THoliday) =>
          Number(new Date(val1.end_date)) - Number(new Date(val2.end_date)),
      )[vacationDays.length - 1].end_date,
    );
    lastVacationDay.setDate(lastVacationDay.getDate() + howManyPassVacationDays);
  }

  return (
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
                startDate={watchAllDate.startDate}
                endDate={watchAllDate.endDate}
                maxDate={watchAllDate.endDate}
                minDate={
                  type === TypeRestDay.VACATION ? lastVacationDay : lastSickDay
                }
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
                startDate={watchAllDate.startDate}
                endDate={watchAllDate.endDate}
                minDate={watchAllDate.startDate}
                maxDate={getMaxDate}
                selected={field.value}
                onChange={field.onChange}
                placeholderText="End date"
              />
            );
          }}
        />
        <SelectBlock
          size="middle"
          defaultValue="vacation"
          onSelect={(type: any) => setType(type)}
          value={type}
        >
          <Option value="vacation">Vacation</Option>
          <Option value="sick">Sick leave</Option>
        </SelectBlock>
      </StyledInputContent>

      <StyledModalContent>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={toggleModal}>
            Confirm Reservation
          </Button>
        </Form.Item>
      </StyledModalContent>
    </Form>
  );
};

export default ModalWindow;

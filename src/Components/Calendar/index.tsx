import { SubmitButton, CalendarBlock, SelectBlock, BottomBlock } from './styled';
import 'antd/dist/antd.css';
import './style.css';
import { Select, ConfigProvider, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import 'moment/locale/en-gb';
import locale from 'antd/es/locale/en_GB';
import { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { IMatchParams } from 'views/AdminView/types';
import { bookigRestDays } from 'hooks/useUsers';
import { RangeValue } from 'rc-picker/lib/interface.d';
import { TBookkHoliday } from 'hooks/types';
import { AxiosResponse } from 'axios';

moment.locale('en-gb', {
  week: {
    dow: 1,
  },
  weekdaysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
});

const { RangePicker } = DatePicker;
const { Option } = Select;

const Calendar = () => {
  const userId = useRouteMatch<IMatchParams>().params.id;

  const [type, setType] = useState<string>('vacation');
  const [date, setDate] = useState<[string, string]>(['', '']);

  // Все перепробовал, но не нашел тип.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeRestType = (value: any) => setType(value);
  const onSelectRestDays = (
    values: RangeValue<Moment>,
    dateString: [string, string],
  ): void => setDate(dateString);
  const [start_date, end_date]: Array<string> = date;
  const days: TBookkHoliday = { type, start_date, end_date };
  const book: () => Promise<AxiosResponse<TBookkHoliday, IMatchParams>> = () =>
    bookigRestDays(days, userId);

  return (
    <CalendarBlock>
      <div>
        <ConfigProvider locale={locale}>
          <RangePicker
            className="direction"
            open
            size="large"
            onChange={onSelectRestDays}
          />
        </ConfigProvider>
      </div>
      <BottomBlock>
        <SelectBlock
          size="large"
          defaultValue={type}
          onSelect={typeRest => onChangeRestType(typeRest)}
        >
          <Option value="vacation" key="vacation">
            Vacation
          </Option>
          <Option value="sick" key="sick">
            Sick leave
          </Option>
        </SelectBlock>
        <SubmitButton htmlType="submit" type="primary" size="large" onClick={book}>
          Submit
        </SubmitButton>
      </BottomBlock>
    </CalendarBlock>
  );
};

export default Calendar;

import { DatePickerBlock, SubmitButton, CalendarBlock, SelectBlock, BottomBlock } from './styled';
import 'antd/dist/antd.css';
import './style.css';
import { Select, ConfigProvider } from 'antd';
import moment from 'moment'
import 'moment/locale/en-gb';
import locale from 'antd/es/locale/en_GB';


moment.locale('en-gb', {
  week: {
    dow: 1
  },
  weekdaysMin : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
});

const { RangePicker } = DatePickerBlock;
const { Option } = Select;



const Calendar = () => {
    return (
        <CalendarBlock>
            <div>
                <ConfigProvider locale={locale}>
                    <RangePicker open size='large' />
                </ConfigProvider>
            </div>
            <BottomBlock>
                <SelectBlock size='large' defaultValue="vacation">
                    <Option value="vacation">Vacation</Option>
                    <Option value="sickleave">Sick leave</Option>
                </SelectBlock>
                <SubmitButton htmlType="submit" type="primary" size='large'>Submit</SubmitButton>
            </BottomBlock>
        </CalendarBlock>
    )
}

export default Calendar
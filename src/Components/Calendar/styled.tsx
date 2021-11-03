import styled from 'styled-components';
import { DatePicker, Button, Select } from 'antd';


const CalendarBlock = styled.div`
    width: calc(100% - 50%);
    height: calc(100% - 50%);
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    /* align-items: center; */
    margin: auto;
    position: relative;
    padding: 20px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
`;

const DatePickerBlock = styled(DatePicker)`
    /* .ant-picker-panel-container {
        background: red;
    } */

`;

const SubmitButton = styled(Button)`
    margin-left: 10px;
`;

const SelectBlock = styled(Select)`
    width: 120px;
`;

const BottomBlock = styled.div`
    margin-top: 300px;
    width: 100%;
    display: flex;
    justify-content: space-between;

`;

export {
    DatePickerBlock,
    SubmitButton,
    CalendarBlock,
    SelectBlock,
    BottomBlock
};
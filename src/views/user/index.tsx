import { useState } from "react";
import "antd/dist/antd.css";
import { lang } from "language/en";
import {
  Row,
  Input,
  Form,
  Modal,
  Button,
  DatePicker,
  Table,
  Select,
} from "antd";
import {
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledFormItem,
  StyledDivContent,
  StyledDivVacationInfo,
  SelectBlock,
  StyledModalContent,
} from "./styles";
import moment from "moment";
import { columns } from "./const";
import Layout from "./layout";
import Sidebar from "../../Components/Sidebar";
import shortid from "shortid";

const { RangePicker } = DatePicker;
const { Option } = Select;

const data = [
  {
    key: "PQBVhT9Ve",
    startDate: ["16th Nov 2021"],
    endDate: ["26th Dec 2021"],
    status: "approved",
    type: "vacation",
  },
  {
    key: "JrL0fbUFW",
    startDate: ["16th Nov 2021"],
    endDate: ["26th Dec 2021"],
    status: "approved",
    type: "vacation",
  },
  {
    key: "vpL0AMwK1y",
    startDate: ["16th Nov 2021"],
    endDate: ["26th Dec 2021"],
    status: "pending",
    type: "vacation",
  },
  {
    key: "A6xDpRGOm",
    startDate: ["16th Nov 2021"],
    endDate: ["26th Dec 2021"],
    status: "pending",
    type: "sick leave",
  },
];

interface Props {
  selectedDate: [] | null;
}

const UserView = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [request, setRequest] = useState<{}>(data);
  const [selectedType, setSelectedType] = useState("vacation");
  const [stringDate, setStringDate] = useState([]);
  const [date, setDate] = useState<Props[] | string>("");

  const disabledDate = (current: any) => {
    return current && current < moment().endOf("day");
  };
  const onDateChange = (date: any, toString: any) => {
    setDate(date);
    setStringDate(toString);
  };

  const onSubmit = () => {
    onDateChange(date, toString);

    const item = {
      key: shortid.generate(),
      startDate: stringDate[0],
      endDate: stringDate[1],
      status: "pending",
      type: selectedType,
    };

    setRequest((prevState: any) => [item, ...prevState]);
    console.log(item);

    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setDate("");
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
            <div className="reserv_message">
              Please choose dates of reservation.
            </div>
            <Form>
              <RangePicker
                disabledDate={disabledDate}
                onChange={onDateChange}
                format="Do MMM YYYY"
              />

              <SelectBlock
                size="middle"
                defaultValue="vacation"
                onChange={(type: any) => setSelectedType(type)}
                value={selectedType}
              >
                <Option value="vacation">Vacation</Option>
                <Option value="sickleave">Sick leave</Option>
              </SelectBlock>
              <StyledModalContent>
                <Button onClick={toggleModal}>Cancel</Button>
                <Form.Item>
                  <Button type="primary" htmlType="submit" onClick={onSubmit}>
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
                      type: "string",
                      required: true,
                      message: `${lang.username["firstName-validation"]}`,
                    },
                  ]}
                >
                  <Input placeholder="FirstName" />
                </StyledFormItem>

                <StyledFormItem
                  name="LastName"
                  rules={[
                    {
                      type: "string",
                      required: true,
                      message: `${lang.username["lastName-validation"]}`,
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
          <Table columns={columns} dataSource={data} size="large" />
        </StyledContent>
      </StyledLayout>
    </Layout>
  );
};
export default UserView;

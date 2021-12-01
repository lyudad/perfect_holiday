import { Result, Button } from 'antd';

export const NotAccess = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, but you do not have access to this page."
      extra={
        <Button type="primary" href="/user">
          Back Home
        </Button>
      }
    />
  );
};

export const columns = [
    {
      title: "User",
      dataIndex: "name",
      sorter: {
        compare: (a: { name: any }, b: { name: any }) => a.name - b.name,
        multiple: 3,
      },
    },
    {
      title: "Dates",
      dataIndex: "date",
      sorter: {
        compare: (a: { date: any }, b: { date: any }) => a.date - b.date,
        multiple: 3,
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: {
        compare: (a: { type: any }, b: { type: any }) => a.type - b.type,
        multiple: 3,
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      sorter: {
        compare: (a: { actions: any }, b: { actions: any }) =>
          a.actions - b.actions,
        multiple: 3,
      },
    },
];
  
export const data = [
    {
      key: "1",
      name: "User1",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
    {
      key: "2",
      name: "User2",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
    {
      key: "3",
      name: "User3",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
    {
      key: "4",
      name: "User4",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
    {
      key: "5",
      name: "User5",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
    {
      key: "6",
      name: "User6",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
    {
      key: "7",
      name: "User7",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
    {
      key: "8",
      name: "User8",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
    {
      key: "9",
      name: "User9",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
    {
      key: "10",
      name: "User10",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
    {
      key: "11",
      name: "User11",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
    {
      key: "12",
      name: "User12",
      date: "21.12.2021-25.12.2021",
      type: "vacation",
      actions: "Approve/Decline/Edit",
    },
  ];
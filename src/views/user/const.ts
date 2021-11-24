export const columns = [
    {
        title: 'Start Date',
        dataIndex: 'startDate',
    },
    {
        title: 'End Date',
        dataIndex: 'endDate',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Type',
        dataIndex: 'type',
    },
];

export const sellectItemColor = (status:any) => {
    if(status === 'declined'){
        return 'red'
    }
    if(status === "approved"){
        return 'green'
    }
    if(status === "pending"){
        return "yellow"
    }
}
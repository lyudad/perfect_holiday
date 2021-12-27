import { message, Modal, Popconfirm } from 'antd';
import { toDeleteVacations, getUserRequestDays } from 'hooks/useUsers';
import { lang } from 'language/en';
import { CollectionDeleteVacationProps } from './types';
import store from 'Redux/store';


export const CollectionDeleteVacation: React.FC<CollectionDeleteVacationProps> = ({values, visible, onCreate, onCancel}) => {
    const state = store.getState();
    const userId = state.person.user.id;
    const {refetch} = getUserRequestDays(userId);

    return (
        // <Modal
        <Popconfirm 
            // title="Are you sure？"
            // okText="Yes"
            // cancelText="No"
            // mask={false}
            visible={visible}
            title={lang.deleteVacation.description}
            okText={lang.deleteVacation.okText}
            cancelText={lang.deleteVacation.cancelText}
            onCancel={onCancel}
            onConfirm={() => {
                toDeleteVacations({
                    id: values.key.id,
                    userId: values.dataIndex,
                }).then(() => {
                    message.success(lang.deleteVacation.successDelete);
                    refetch();
                }).catch(() => {
                    message.error(lang.deleteVacation.failDelete);
                });
                onCreate();
            }}
            // onOk={() => {
            //     toDeleteVacations({
            //         id: values.key.id,
            //         userId: values.dataIndex,
            //     }).then(() => {
            //         message.success(lang.deleteVacation.successDelete);
            //         refetch();
            //     }).catch(() => {
            //         message.error(lang.deleteVacation.failDelete);
            //     });
            //     onCreate();
            // }}
        >
            {/* {lang.deleteVacation.description} */}
        {/* </Modal> */}
        </Popconfirm>
    );
};

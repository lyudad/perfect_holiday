import { message, Modal } from 'antd';
import { toDeleteVacations, getUserRequestDays } from 'hooks/useUsers';
import { lang } from 'language/en';
import { CollectionDeleteVacationProps } from './types';
import store from 'Redux/store';


export const CollectionDeleteVacation: React.FC<CollectionDeleteVacationProps> = ({values, visible, onCreate, onCancel}) => {
    const state = store.getState();
    const userId = state.person.user.id;
    const {refetch} = getUserRequestDays(userId);
    return (
        <Modal
            mask={false}
            visible={visible}
            title={lang.deleteVacation.title}
            okText={lang.deleteVacation.okText}
            cancelText={lang.deleteVacation.cancelText}
            onCancel={onCancel}
            onOk={() => {
                toDeleteVacations({
                    id: values.key.id,
                    userId: values.dataIndex,
                }).then(() => {
                    refetch();
                    message.success(lang.deleteVacation.successDelete, 5);
                }).catch(() => {
                    message.error(lang.deleteVacation.failDelete, 5);
                });
                onCreate();
            }}
        >
            {lang.deleteVacation.description}
        </Modal>
    );
};

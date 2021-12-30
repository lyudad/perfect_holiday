import {message, Modal} from 'antd';
import useGetListOfUsers, {toDeleteUser} from 'hooks/useUsers';
import {lang} from 'language/en';
import {CollectionDeleteProps} from './types';


export const CollectionDeleteForm: React.FC<CollectionDeleteProps> = ({values, visible, onCreate, onCancel}) => {
    const {refetch} = useGetListOfUsers();

    return (
        <Modal
            mask={false}
            visible={visible}
            title={lang.deleteUser.title}
            okText={lang.deleteUser.okText}
            cancelText={lang.deleteUser.cancelText}
            onCancel={onCancel}
            onOk={() => {
                toDeleteUser({
                    id: values.key.id,
                    userId: values.dataIndex,
                }).then(() => {
                    refetch();
                    message.success(lang.superAdmin.successDelete, 5);
                }).catch(() => {
                    message.error(lang.superAdmin.failDelete, 5);
                });
                onCreate();
            }}
        >
            {lang.deleteUser.description}
        </Modal>
    );
};

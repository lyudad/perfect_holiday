import { IUserId } from "hooks/types";

export interface CollectionDeleteVacationProps {
  values: { dataIndex: string, key: IUserId }
  visible: boolean;
  onCreate: () => void;
  onCancel: () => void;
}
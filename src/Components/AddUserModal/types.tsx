export interface UserValues {
  first_name: string;
  last_name: string;
  email: string;
}

export interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: UserValues) => void;
  onCancel: () => void;
}

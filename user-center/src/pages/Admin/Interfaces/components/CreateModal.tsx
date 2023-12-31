import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const { columns,visible, onCancel, onSubmit } = props;

  return (
    <Modal  open={visible} onCancel={()=>{onCancel?.()}} title={"新建接口"} footer={null}>
      <ProTable type={"form"} columns={columns}
                onSubmit={async (values)=>{
                  onSubmit?.(values);
                }}/>
    </Modal>
  );
};
export default CreateModal;

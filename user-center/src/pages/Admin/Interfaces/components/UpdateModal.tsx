import type {ProColumns, ProFormInstance} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';

export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { values, visible,columns, onCancel, onSubmit } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values])

  return (
    <Modal  open={visible}
            onCancel={()=>{onCancel?.()}}
            title={"编辑接口"}
            footer={null}
    >
      <ProTable type={"form"}
                columns={columns}
                formRef={formRef}
                onSubmit={async (value)=>{
                  value.id = values.id;
                  onSubmit?.(value);
                }}
      />

    </Modal>
  );
};
export default UpdateModal;

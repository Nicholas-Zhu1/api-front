
import React, {useEffect, useRef} from 'react';
import {ProColumns, ProFormInstance, ProTable} from "@ant-design/pro-components";
import {Modal} from "antd";

export type UpdateFormProps = {
  columns: ProColumns<API.UpdateUser>[]
  onCancel: () => void;
  onSubmit: (values: API.UpdateUser) => Promise<void>;
  values: API.UpdateUser
  visible: boolean;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const {columns,onCancel,onSubmit,values,visible} = props;
  const formRef  = useRef<ProFormInstance>();
  useEffect(()=>{
    if (formRef){
      formRef.current?.setFieldsValue(values)
    }
  },[visible])


  return (
    <Modal  open={visible}
            onCancel={()=>{onCancel?.()}}
            title={"编辑用户"}
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
  )
};
export default UpdateForm;


import React from 'react';
import {ProTable,  ProColumns} from "@ant-design/pro-components";
import {Modal} from "antd";

export type Props = {
  columns: ProColumns<API.AddUser>[]
  onCancel: () => void;
  onSubmit: (values: API.AddUser) => Promise<void>;
  visible: boolean;
};
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const CreateModal: React.FC<Props> = (props) => {
  const {columns,visible,onCancel,onSubmit} = props;
  return (
    <Modal  open={visible} onCancel={()=>{onCancel?.()}} title={"新建用户"} footer={null}>
    <ProTable type={"form"} columns={columns}
    onSubmit={async (values)=>{
      onSubmit?.(values);
    }}/>

    </Modal>
  );
};
export default CreateModal;


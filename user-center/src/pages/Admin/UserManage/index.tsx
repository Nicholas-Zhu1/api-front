import React, {useRef, useState} from 'react';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import {ProTable} from '@ant-design/pro-table';
import {addUser, deleteUser, list, updateUser} from "@/services/ant-design-pro/api";
import {Button, Drawer, Image, message} from "antd";
import {ProDescriptions} from "@ant-design/pro-components";
import {PlusOutlined} from '@ant-design/icons';
import CreateModal from "@/pages/Admin/UserManage/components/CreateModal";
import UpdateForm from "@/pages/Admin/UserManage/components/UpdateForm";

const UserManage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [userinfo, setUserinfo] = useState({} as API.CurrentUser);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.CurrentUser>();

  const handleAdd = async (fields: API.AddUser) => {
    const hide = message.loading('正在添加');
    try {
      await addUser({
        ...fields,
      });
      hide();
      message.success('添加成功');
      handleModalVisible(false);
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('添加失败，请重试!');
      return false;
    }
  };
  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.UpdateUser) => {
    const hide = message.loading('更新中');
    try {
      await updateUser({
        ...fields
      })

      hide();
      message.success('更新成功');
      handleUpdateModalVisible(false);
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('更新失败，请重试!');
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.DeleteUser) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await deleteUser({
        id: selectedRows.id,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
/*
      message.error('删除失败，请重试');
*/
      return false;
    }
  };
  const columns: ProColumns<API.CurrentUser>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
      hideInForm: true,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      copyable: true,
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      tooltip: '账号要唯一',
      copyable: true,
      formItemProps: {
        rules: [{required: true}]
      },
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      render: (_, record) => (
        <div>
          <Image  src={record.userAvatar} width={100}/>
        </div>
      ),
      hideInForm: true,
      hideInSearch:true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType:'select',
      valueEnum:{
        0:{text: '女'},
        1:{text: '男'},
      },
      hideInSearch:true,
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueType:'select',
      valueEnum: {
        user: {text: '普通用户', status: 'Default'},
        admin: {
          text: '管理员',
          status: 'Success',
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      valueType:'select',
      valueEnum: {
        0: {text: '正常', status: 'Default'},
        1: {text: '冻结', status: 'Error'},
      },
      hideInSearch:true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch:true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <Button
          type={"primary"}
          key={"editable"}
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalVisible(true);
          }}
        >
          修改
        </Button>,
        <Button
          type={"primary"}
          key={"detail"}
          onClick={() => {
            setUserinfo(record)
            setIsShowDetail(true)
          }}>
          详情
        </Button>,
        <Button
          type={"primary"}
          danger={true}
          key={"delete"}
          onClick={async () => {
            await handleRemove(record);
            actionRef.current?.reloadAndRest?.();
          }}>
          删除
        </Button>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.CurrentUser>

        columns={columns}
        actionRef={actionRef}
        cardBordered
        // @ts-ignore
        request={async (params, sort, filter) => {
          console.log(params,sort,filter);

          const pageList = await list(params);
          if (pageList.data) {
            return {
              data: pageList.data || [],
              success: true,
            }
          }
          return {
            data: [],
            success: false,
            total: 0,
          }
        }}
        // @ts-ignore
       /* request={list
        }*/
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={
          {
            collapsed:false,
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type==='get'){
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="用户管理"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
      />
      <Drawer
        visible={isShowDetail}
        onClose={() => {
          setIsShowDetail(false);
        }}>
        {isShowDetail && (<ProDescriptions<API.CurrentUser>
            request={async () => ({
              data: userinfo
            })}
            columns={columns.filter((i) => (i.valueType !== 'option'))}
            column={1}
            bordered={true}
          />
        )}
      </Drawer>
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalVisible(false)
        }}
        onSubmit={async (values) => {
          await handleAdd(values);
        }}
        visible={createModalVisible}>
      </CreateModal>

      <UpdateForm columns={columns}
                  onSubmit={async (values) => {
                    const success = await handleUpdate(values);
                    if (success) {
                      handleUpdateModalVisible(false);
                      setCurrentRow(undefined);
                      if (actionRef.current) {
                        actionRef.current?.reload();
                      }
                    }
                  }}
                  onCancel={() => {
                    handleUpdateModalVisible(false);
                    if (!isShowDetail) {
                      setCurrentRow(undefined);
                    }
                  }}
                  visible={updateModalVisible}
                  values={currentRow||{}}>
      </UpdateForm>

    </>
  );
};
export default UserManage;

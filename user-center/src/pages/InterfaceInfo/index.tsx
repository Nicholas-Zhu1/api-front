import {PageContainer, ProCard,ProDescriptions} from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import {Button, Card, Form, message, Input, Divider} from 'antd';
import {
  getInterfaceInfoById,
  invokeInterfaceInfo,
} from '@/services/user-api/interfaceInfoController';
import {useParams} from "umi";
/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {

  const [, setLoading] = useState(false);
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.UserInterfaceInVO>();



  // @ts-ignore
  const {id} = useParams();
  const loadData = async () => {
    if (id==null||!id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoById({
        id: Number(id),
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfo({
        id: id,
        ...values,
      });
      setInvokeRes(res.data);
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  return (
    <PageContainer title="查看接口信息" >
      {data ? (<ProCard title={data.name}
                        extra={(data.totalNum&&data.totalNum>10)?<img src="/icons/fire.svg" alt={"fire_icon"}/>:[]}
        >
          <ProDescriptions column={1}>
            <ProDescriptions.Item label="接口状态" >{data.status ?  <span>正常</span>:
                                                                  <span>关闭</span>}</ProDescriptions.Item>
            <ProDescriptions.Item label="描述">{data.description}</ProDescriptions.Item>
            <ProDescriptions.Item label="请求地址">{data.url}</ProDescriptions.Item>
            <ProDescriptions.Item label="请求方法">{data.method}</ProDescriptions.Item>
            <ProDescriptions.Item label="请求参数" valueType={"jsonCode"}>{data.requestParams}</ProDescriptions.Item>
            <ProDescriptions.Item label="请求头" valueType={"text"}>{data.requestHeader}</ProDescriptions.Item>
            <ProDescriptions.Item label="响应头" valueType={"text"}>{data.responseHeader}</ProDescriptions.Item>
            <ProDescriptions.Item label="创建时间" valueType={"date"}>{data.createTime}</ProDescriptions.Item>
            <ProDescriptions.Item label="更新时间" valueType={"date"}>{data.updateTime}</ProDescriptions.Item>
            <ProDescriptions.Item label="剩余调用次数">
              {data.leftNum}次<a>&nbsp;&nbsp;购买次数</a>
             </ProDescriptions.Item>
          </ProDescriptions>
        </ProCard>
        ) : (
          <>接口不存在</>
        )}
      <Divider />
      <Card title="在线测试">
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea required={true}/>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit" onBlur={loadData}
                >
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;

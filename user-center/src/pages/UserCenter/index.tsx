import { PageContainer, ProCard, ProDescriptions} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {message, Divider} from 'antd';
import {currentUser,} from "@/services/ant-design-pro/api";
import {ProFormUploadButton} from "@ant-design/pro-components";


/**
 * 个人中心
 * @constructor
 */
const UserCenter: React.FC = () => {

  const [, setLoading] = useState(false);
  const [data, setData] = useState<API.CurrentUser>();


  const loadData = async () => {
    setLoading(true);
    try {
      const res = await currentUser({
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

/*
  const Upload = async (fields: API.UpLoadUserAvatar) =>{
    if (!fields) return true;
    try {
      await upload({
        id: fields.id,
        userAvatar: fields.userAvatar,
      });
      actionRef.current?.reload();
      return true;
    } catch (error) {
      return false;
    }
  }
*/
/*  const Upload = {
    //数量
    maxCount: 1,
    accept: ".png",
    customRequest: (options: any) => {
      const { onSuccess, onError, file} = options;
      const formData = new FormData();
      formData.append('userAvatar', file);
      // /upload为图片上传的地址，后台只需要一个图片的path
      // name，path，status是组件上传需要的格式需要自己去拼接
      request('/api/user/upload',{method: 'POST',data: formData}).then((data_img: any) => {
        const _response = { name: file.name, status: "done",path: data_img.path  };
        //请求成功后把file赋值上去
        onSuccess(_response, file);
      }).catch(onError);
    },
  }*/


  useEffect(() => {
    loadData();
  }, []);


  return (
    <PageContainer title="个人中心">
      <ProCard>
        {data ? (
          <ProDescriptions title={data.userName} column={1}>
            <ProDescriptions.Item label="用户头像" valueType={"image"}>{data.userAvatar}</ProDescriptions.Item>
            <span>
            <ProFormUploadButton
              max={1}
              title={data.userAvatar==null?'上传头像':'更改头像'}
              name={"userAvatar"}
              tooltip={"该功能还待实现"}
            >
            </ProFormUploadButton>
            </span>
            <ProDescriptions.Item label="用户角色">{data.userRole=='user'?'普通用户':'管理员'}</ProDescriptions.Item>
            <ProDescriptions.Item label="性别">{data.gender==1?'男':'女'}</ProDescriptions.Item>
            <ProDescriptions.Item label="创建时间" valueType={"date"}>{data.createTime}</ProDescriptions.Item>
          </ProDescriptions>
        ) : (
          <>用户不存在</>
        )}
      </ProCard>
      <Divider />

    </PageContainer>
  );
};

export default UserCenter;

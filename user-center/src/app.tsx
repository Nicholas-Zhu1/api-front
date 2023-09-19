import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig,RequestConfig } from 'umi';
import { history} from 'umi';
import defaultSettings from '../config/defaultSettings';
import {currentUser as queryCurrentUser} from './services/ant-design-pro/api';

const loginPath = '/user/login';
const WHITE_LIST = ['/user/register',loginPath];
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * 全局响应拦截器
 * 有个小问题：当用户在登录页刷新时，不要弹出错误；而要用户输入错误的用户信息时才弹出最好
 */
export const request: RequestConfig = {
  credentials: 'include', // 默认请求是否带上cookie
  prefix: process.env.NODE_ENV === 'production' ? 'http://8.137.127.228:8123' : undefined,
  baseURL: 'http://8.137.127.228:8123',
  timeout: 100000,
  responseInterceptors: [
    async (response) => {
      const res = await response.clone().json(); //这里是关键，获取所有接口请求成功之后的数据
      // 拦截响应数据，进行个性化处理
      console.log('data', res.data);
      if (res.code !== 0) {
        if(WHITE_LIST.includes(history.location.pathname)){
          return res;
        }
        throw new Error(res.description);
      }
      return res;
    },
  ],
};



/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.BaseResponse<API.CurrentUser>;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.BaseResponse<API.CurrentUser> | undefined>;

}> {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrentUser();
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const currentUser = await fetchUserInfo();
  if (!WHITE_LIST.includes(history.location.pathname)) {
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };

}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {

  // @ts-ignore
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.data?.userName,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (WHITE_LIST.includes(location.pathname)) {
        return;
      }
      // 在不是白名单的页面时，如果没有查询到当前用户信息，重定向到 login
      if (!initialState?.currentUser?.data) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: any) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };

};


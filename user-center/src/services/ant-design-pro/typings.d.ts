// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ListUserQuery = {
    current?: number;
    pageSize?: number;
    userName?: string;
    userAccount?: string;
    gender?:number;
    userStatus?: number;
    userRole?: string;
    createTime?: Date;
  };
  type UserPage = {
    code?:number;
    data?: object;
    msg?: string;
    description?: string;
  }
  type CurrentUser = {
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?:number;
    userStatus?: number;
    userRole?: string;
    createTime?: Date;
    records?: Page<any>;
    unreadCount?: number;
    total?: number;
  };
  type UpLoadUserAvatar = {
    id?: number;
    userAvatar?: string;
  }
  type AddUser = {
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?:number;
    userStatus?: number;
    userRole?: string;
  };
  type UpdateUser = {
    id?: number;
    userName?: string;
    userAccount?: string;
    gender?:number;
    userStatus?: number;
    userRole?: string;
  };
  type DeleteUser = {
    id?: number;
  };
  type Page<T> = {
    countId?: number;
    current?: number;
    maxLimit?: number;
    pages?: number;
    records?:T;
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };
  type RegisterResult = number;
  /**
   * 通用返回类
   */
  type BaseResponse<T> = {
    code?: number;
    data?: T;
    message?: string;
    description?: string;
  };
  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };
  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };


  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };


  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type FakeCaptcha = {
    code?: number;
    status?: string;
  };


}

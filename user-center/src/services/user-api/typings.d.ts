declare namespace API {
  type DeleteInterfaceInfo = {
    id?: number;
  };
  type InterfaceInfoId = {
    id?: number;
  };
  type BaseResponseInterfaceInfo = {
    code?: number;
    data?: any;
    message?: string;
  };
  type addInterfaceInfo = {
    description?: string;
    method?: string;
    name?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    url?: string;
  };
  type InterfaceInfo = {
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };
type UserInterfaceInVO = {
  createTime?: string;
  description?: string;
  id?: number;
  isDelete?: number;
  method?: string;
  name?: string;
  requestHeader?: string;
  requestParams?: string;
  responseHeader?: string;
  status?: number;
  updateTime?: string;
  url?: string;
  userId?: number;
  leftNum?: number;
  totalNum?: number;
}

  type listUserInterfaceInfoByPage = {
    current?: number;
    id?: number;
    description?: string;
    method?: string;
    name?: string;
    pageSize?: number;
    requestHeader?: string;
    responseHeader?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageInterfaceInfo = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };


  type InterfaceInfoAddRequest = {
    interfaceInfoId?: number;
    leftNum?: number;
    totalNum?: number;
    userId?: number;
  };

  type InterfaceInfoUpdateRequest = {
    id?: number;
    leftNum?: number;
    status?: number;
    totalNum?: number;
  };




}

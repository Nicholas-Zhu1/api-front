export default [

  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { name: '注册', path: '/user/register', component: './user/Register' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎页', icon: 'smile', component: './Welcome' },
  { path: '/index', name: '主页', icon: 'smile', component: './InterfaceInfoIndex/' },
  { path: '/interface_info/:id', name: '查看接口', icon: 'smile', component: './InterfaceInfo/',hideInMenu: true},
  { path: '/userCenter', name: '个人中心', component: './UserCenter/',hideInMenu: true},
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component:'./Admin',
    routes: [
      { path: '/admin/user-manage', name: '用户管理', component: './Admin/UserManage'},
      { path: '/admin/interface_info',name: '接口管理',component: './Admin/Interfaces' },
      { component: './404' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];

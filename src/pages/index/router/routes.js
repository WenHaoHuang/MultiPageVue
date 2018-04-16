const route = [
    {
        path: '/',
        redirect: '/index',
        meta: {
            title: '首页 - demo'
        }
    },
    {
        path: '/index',
        name: 'index',
        component: resolve => require(['../views/index.vue'], resolve),
        meta: {
            title: '首页 - demo'
        }
    },
];
export default route;

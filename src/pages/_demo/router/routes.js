const route = [
    {
        path: '/',
        redirect: '/index',
        meta: {
            title: 'demo',
            hidden: true
        }
    },
    {
        path: '/index',
        name: 'index',
        component: resolve => require(['../views/index.vue'], resolve),
        meta: {
            title: 'demo',
            hidden: true
        }
    },
];
export default route;

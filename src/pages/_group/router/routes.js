const route = [
    {
        path: '/',
        redirect: '/login',
        meta: {
            title: '首页',
            hidden: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['../views/login.vue'], resolve),
        meta: {
            title: '登录',
            hidden: true
        }
    },
    {
        path: '/index',
        name: 'index',
        component: resolve => require(['../views/index.vue'], resolve),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/alarm',
        name: 'alarm',
        meta: {
            title: '告警管理'
        },
        component: resolve => require(['../views/pages.vue'], resolve),
        redirect: '/alarm/index',
        children:[{
            path: '/alarm/index',
            name: 'alarmIndex',
            component: resolve => require(['../views/alarm/index.vue'], resolve),
            meta: {
                title: '告警总览'
            }
        },{
            path: '/alarm/list',
            name: 'alarmList',
            component: resolve => require(['../views/alarm/list.vue'], resolve),
            meta: {
                title: '当前告警列表'
            }
        },{
            path: '/alarm/untreate',
            name: 'alarmUntreate',
            component: resolve => require(['../views/alarm/untreate.vue'], resolve),
            meta: {
                title: '逾期未处理告警'
            }
        }]
    },
    {
        path: '/video',
        name: 'video',
        meta: {
            title: '视频管理'
        },
        component: resolve => require(['../views/pages.vue'], resolve),
        redirect: '/video/index',
        children:[{
            path: '/video/index',
            name: 'videoIndex',
            component: resolve => require(['../views/video/index.vue'], resolve),
            meta: {
                title: '视频查看'
            }
        }]
    },
    {
        path: '/inspect',
        name: 'inspect',
        meta: {
            title: '巡检管理'
        },
        component: resolve => require(['../views/pages.vue'], resolve),
        redirect: '/inspect/index',
        children:[{
            path: '/inspect/index',
            name: 'inspectIndex',
            component: resolve => require(['../views/inspect/index.vue'], resolve),
            meta: {
                title: '巡检设备信息'
            }
        },{
            path: '/inspect/status',
            name: 'inspectStatus',
            component: resolve => require(['../views/inspect/status.vue'], resolve),
            meta: {
                title: '巡检完成状况'
            }
        },{
            path: '/inspect/untreate',
            name: 'inspectUntreate',
            component: resolve => require(['../views/inspect/untreate.vue'], resolve),
            meta: {
                title: '逾期未处理设备'
            }
        }]
    },
    {
        path: '/info',
        name: 'info',
        meta: {
            title: '信息管理'
        },
        component: resolve => require(['../views/pages.vue'], resolve),
        redirect: '/info/index',
        children:[{
            path: '/info/index',
            name: 'infoIndex',
            component: resolve => require(['../views/info/info.vue'], resolve),
            meta: {
                title: '楼宇信息'
            }
        },{
            path: '/info/staff',
            name: 'infoStaff',
            component: resolve => require(['../views/info/staff.vue'], resolve),
            meta: {
                title: '消防组织'
            }
        },{
            path: '/info/book',
            name: 'infoBook',
            component: resolve => require(['../views/info/book.vue'], resolve),
            meta: {
                title: '消防设施'
            }
        },{
            path: '/info/sensor',
            name: 'infoSensor',
            component: resolve => require(['../views/info/sensor.vue'], resolve),
            meta: {
                title: '传感器汇总'
            }
        },{
            path: '/info/cctv',
            name: 'infoCctv',
            component: resolve => require(['../views/info/cctv.vue'], resolve),
            meta: {
                title: '摄像头汇总'
            }
        },{
            path: '/info/host',
            name: 'infoHost',
            component: resolve => require(['../views/info/host.vue'], resolve),
            meta: {
                title: '主机设施'
            }
        }]
    },
];
export default route;

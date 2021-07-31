import Help from '../page/help/Help.vue';
import Feedback from '../page/feedback/Feedback.vue';
import testEditor from '../page/testEditor/Editor.vue'
import App from '../App.vue'
export default [{
        path: '/index',
        component: App,
        children: [
            {
              name: '帮助中心',
              path: 'help',
              component:Help
            },
            {
              name: '意见反馈',
              path: 'feedback',
              component:Feedback
            },
            {
              name: '富文本编辑器',
              path: 'testEditor',
              component: testEditor
            },
        ]
    },
    {
        path: '*',
        redirect: '/index/testEditor'
    }
]

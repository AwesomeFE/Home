export default () => [
  {
    path: '/dashboard',
    text: '主页'
  },
  {
    path: '/dashboard/content',
    text: '内容',
    buttons: [
      {path: '/dashboard/content/article', text: '文章'},
      {path: '/dashboard/content/images', text: '图片'}
    ]
  },
  {
    path: '/dashboard/settings',
    text: '设置',
    buttons: [
      {path: '/dashboard/settings/staff', text: '客服'},
      {path: '/dashboard/settings/locations', text: '定位'}
    ]
  }
]
import r from '@/utils/request'

export function saveText(data) {
  return r({
    url: '/app/admin/setting/AboutWith',
    method: 'post',
    data
  })
}

export function getText() {
  return r({
    url: '/app/user/AboutWith',
    method: 'get',
    params: {
      ipAddr: '154.204.59.100'
    }
  })
}

import r from '@/utils/request'

export function getMessage(params) {
  return r({
    url: '/app/admin/messageList',
    method: 'get',
    params
  })
}

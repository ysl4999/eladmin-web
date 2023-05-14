import r from '@/utils/request'

export function getUserList(params) {
  return r({
    url: '/app/admin/listUser',
    method: 'get',
    params
  })
}

export function updateUserStatus(data) {
  return r({
    url: '/app/admin/setUserAble',
    method: 'post',
    data
  })
}

export function updateUserAutoAdd(data) {
  return r({
    url: '/app/admin/setUserAutoAdd',
    method: 'post',
    data
  })
}

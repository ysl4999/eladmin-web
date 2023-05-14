import r from '@/utils/request'

export function getGroups(params) {
  return r({
    url: '/app/admin/GroupList',
    methods: 'get',
    params
  })
}

export function removeGroup(data) {
  return r({
    url: '/app/admin/removeGroup',
    method: 'post',
    data
  })
}

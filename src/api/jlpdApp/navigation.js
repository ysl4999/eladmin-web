import r from '@/utils/request'

export function getNavList() {
  return r({
    url: '/app/admin/lookNavigation',
    method: 'get'
  })
}

export function getNavInfo(data) {
  return r({
    url: `/app/admin/lookOneNavigation`,
    method: 'get',
    params: data
  })
}

export function updateNav(data) {
  return r({
    url: '/app/admin/updateNavigation',
    method: 'post',
    data
  })
}

export function delNav(data) {
  return r({
    url: '/app/admin/deleteNavigation',
    method: 'post',
    data
  })
}

export function addNav(data) {
  return r({
    url: '/app/admin/setNavigation',
    method: 'post',
    data
  })
}

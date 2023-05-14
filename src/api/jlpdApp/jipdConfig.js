import r from '@/utils/request'

export function getLogoInfo() {
  return r({
    url: '/app/admin/lookLogoAvatarUrl',
    method: 'get'
  })
}

export function setLogo(data) {
  return r({
    url: '/app/admin/setLogoAvatarUrl',
    method: 'post',
    data
  })
}

export function getLoginConfig() {
  return r({
    url: '/app/admin/setting/get/LOGIN_SETTING',
    method: 'get'
  })
}

export function updateLoginConfig(data) {
  return r({
    url: '/app/admin/setting/put/LOGIN_SETTING',
    method: 'post',
    data
  })
}

export function getRegisterConfig() {
  return r({
    url: '/app/admin/setting/get/REGISTER_SETTING',
    method: 'get'
  })
}

export function updateRegisterConfig(data) {
  return r({
    url: '/app/admin/setting/put/REGISTER_SETTING',
    method: 'post',
    data
  })
}

import service from '@/utils/service';

export default {
  getRoleMenus
}

/**
 * 获得用户菜单权限
 * @param roleId 用户权限编号,number,Y
 */
function getRoleMenus(params) {
  return service({
    url:`/menu/getRoleMenus/${params.roleId}`,
    method:'get'
  });
}

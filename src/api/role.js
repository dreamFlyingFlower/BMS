import service from '@/utils/service';

export default{
  getRoleMenu
}

function getRoleMenu(params){
  return service({
    url:`/role/getRoleMenu/${params.roleId}`,
    method:'get'
  });
}

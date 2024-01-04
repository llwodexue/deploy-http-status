const SUCCESS = { code: 200, data: null, msg: '操作成功' }

const BAD_REQUEST = { code: 400, data: null, msg: '参数错误' }
const UNAUTHORIZED = { code: 401, data: null, msg: 'Token验证失败' }
const FORBIDDEN = { code: 403, data: null, msg: '未授权' }

const ERROR = { code: 500, data: null, msg: '系统错误' }

const USER_NOT_EXIST = { code: 601, data: null, msg: '用户不存在' }
const PASSWORD_ERROR = { code: 602, data: null, msg: '密码不正确' }

module.exports = { ERROR, SUCCESS, PASSWORD_ERROR, USER_NOT_EXIST, UNAUTHORIZED, FORBIDDEN, BAD_REQUEST }

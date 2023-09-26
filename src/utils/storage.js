// 存储时的键
const INFO_KEY = 'hm-shopping-infor'
// 获取个人信息
export const getInfor = () => {
  const result = localStorage.getItem(INFO_KEY)
  // console.log(result)
  return result ? JSON.parse(result) : { token: '', userId: '' }
}
// 设置个人信息
export const setInfor = (info) => {
  // console.log(1)
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}
// 移除个人信息
export const removeInfor = () => {
  localStorage.removeItem(INFO_KEY)
}

// 搜索框和搜索历史
// 存储的键
const HISTORY_KEY = 'hm_history_list'
// 获取搜索历史
export const getHistoryList = () => {
  // JSON.parse() 用来解析JSON字符串，得到对应的JavaScript值或对象。
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
// 设置搜索历史
export const setHistoryList = (arr) => {
  // JSON.stringify() 将一个JavaScript对象或值转换为JSON格式字符串。
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}

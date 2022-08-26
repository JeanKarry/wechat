import request from '@/utils/request'
import { API } from './../index'
// 和好友有关的的API接口
export default {
  getMyFriends(id) {
    return request.get(`${API}/friendly/myfriends?id=${id}`)
  },
  getRecentConversationList(data) {
    return request.post(`${API}/friendly/recentconversation`, data)
  },
  deleteFriend(data) {
    return request.post(`${API}/friendly/deltefriend`, data)
  }
}

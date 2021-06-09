import axiosInstance from '../lib/axios';

export const getQuestionAPI = ({ userType, userId, question }) => {
	return new Promise((resolve, reject) => {
		try {
			//axiosInstance.post(`/${userType}?userId=${userId}`, question).then(res => {
			axiosInstance.post(`/${'employee'}?userId=${userId}`, question).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		} catch (err) {
			reject(err)
		}
	})
}
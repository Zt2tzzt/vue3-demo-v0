/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-02-19 21:43:11
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-19 21:46:55
 * @LastEditContent: 
 */
const obj = {
	name: 'zzt',
	friend: {
		name: 'lingard',
		age(num) {
			return num
		}
	}
}
console.log(obj?.foo?.bar);

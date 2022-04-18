
import Dayjs from "dayjs"

import "dayjs/locale/zh-cn"

import relativeTime from 'dayjs/plugin/relativeTime'

import Vue from 'vue'

Dayjs.extend(relativeTime)

Dayjs.locale('zh-cn')

Dayjs().format('YYYY-MM-DD')

// console.log(Dayjs().format('YYYY-MM-DD'));

Vue.filter('relativeTime',value=>{
    return Dayjs().to(Dayjs(value))
})
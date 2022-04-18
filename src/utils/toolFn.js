function Random({
    min,
    max,
    last,
    first = false
}) {

    if (first) {
        last[0] = Math.round(Math.random() * (max - min)) + min;
        return last[0]
    }

    last[1] = Math.round(Math.random() * (max - min)) + min;

    if (last[1] != last[0]) {
        last[0] = last[1]
        return last[1]
    } else {
        return Random({
            min,
            max,
            last
        })
    }

}

const plugins = {
    begin: 0,
    install(Vue) {
        // const defaultSrc = options.default
        Vue.directive('lazy', {
            bind(el, binding) {
                plugins.scr = binding.value
                plugins.init(el, binding.value)
                
            },
            inserted(el) {
                if(IntersectionObserver){
                    // console.log("---",IntersectionObserver);
                    plugins.ovserver(el)
                }
            }
        })

        Vue.prototype.throttle = function (fn, delay) {
            let curTime = Date.now();
            if (curTime - plugins.begin > delay) {
                fn()
                plugins.begin = curTime
            }

        }

    },
    init(el, val) {
        // console.log(el);
        el.setAttribute('data-src', val)
    },
    ovserver(el) {
        let io = new IntersectionObserver(entries => {
            const realSrc = el.dataset.src
            if (entries[0].isIntersecting) {
                // if (realSrc) {
                    el.src = realSrc
                    // el.removeAttribute("data-src")
                // }
            }
            // else{
            //     el.setAttribute('data-src', plugins.scr)
            // }
        })
        io.observe(el)
    },
    // 监听scroll事件
    // listenerScroll(el) {
    //     const handler = plugins.throttle(LazyLoad.load, 300)
    //     plugins.load(el)
    //     window.addEventListener('scroll', () => {
    //         handler(el)
    //     })
    // },

}

function jsonpToJson(datas) {
    let jsonData = null
    console.log(datas);
    // 下面是对获取到的数据进行处理，把jsonp格式的数据处理成json格式的数据
    if (typeof datas === 'string') {
        // 返回的是jsonp类型的数据，所以要用正则表达式来匹配截取json数据
        const reg = /^\w+\((\{[^()]+\})\)$/
        const matches = datas.match(reg)
        // matches匹配到的是数组，数组第一个是所有正则表达式匹配的字符串，第二个是第一个小括号匹配到的字符串
        if (matches) {
            jsonData = JSON.parse(matches[1])
        }
    }
    return jsonData
}


//  function findscroller(element){
//     element.onscroll = function(){ console.log(element);}

//     Array.from(element.children).forEach(findscroller)
// }

// findscroller(document.body)

const query = function (selector) {
    return Array.from(document.querySelectorAll(selector))
}

export {
    Random,
    plugins,
    jsonpToJson,
    query
}
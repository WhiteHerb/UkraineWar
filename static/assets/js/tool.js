const eledic = {
    "p": /**@param {String} content innerHTML to p*/(content) => {
        const main = document.createElement('li')
        main.innerHTML = content
        return main
    },
    "small": /**@param {String} content innerHTML to small*/(content) => {
        const main = document.createElement('p')
        main.innerHTML = content
        return main
    },
    "img": /**@param {String} content src to img*/(content) => {
        const div = document.createElement('div')
        div.classList.add('image')
        div.classList.add('main')
        const main = document.createElement('img')
        main.src = content
        div.appendChild(main)
        return div
    },
    "a": /**@param {String} content src to a*/(content) => {
        const main = document.createElement('a')
        main.href = content
        main.innerHTML = "원본"
        return main
    },
    "title1": /**@param {String} content innerHTML to title h1*/(content) => {
        const main = document.createElement('h1')
        main.innerHTML = content
        const mainH = document.createElement('header')
        mainH.classList.add('major')
        mainH.appendChild(main)
        return mainH
    },
    "title2": /**@param {String} content innerHTML to title h2*/(content) => {
        const main = document.createElement('h2')
        main.innerHTML = content
        return main
    },
    "title3": /**@param {String} content innerHTML to title h3*/(content) => {
        const main = document.createElement('h3')
        main.innerHTML = content
        return main
    },
    "hr": (a) => {
        return document.createElement('hr')
    },
    "br": (a) => {
        return document.createElement('br')
    },
    "blockquote": /**@param {String} content inner HTML to blockquote */ (content) => {
        const main = document.createElement('blockquote')
        main.innerHTML = "“" + content + "”"
        return main
    }
    
}
/**
 * @param maindiv {HTMLHeadingElement} main div
 * @param contentlist {Array} node list(contents)
*/
const usetool = (maindiv,contentlist) => {
    contentlist.forEach(header => {
        const headerele = document.createElement('header')
        header.forEach(arr => {
            headerele.appendChild(eledic[arr[0]](arr[1]))
        })
        headerele.appendChild(document.createElement('hr'))
        maindiv.appendChild(headerele)
    })
}
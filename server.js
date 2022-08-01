const timer = require('timers/promises')
const express = require('express')
const app = express()
const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')
const moment = require('moment')
const fs = require('fs') 
const { randomUUID } = require('crypto')

var day = ''
var dathcount = ''
const title = ' | UKRAINAWAR'
const insterurl = 'https://www.instagram.com/hsch.ool/'
const footer = ['Untitled',"https://github.com/WhiteHerb",'HERB']

/**
 * 
 * @param {string} subtitle subtitle
 * @param {Array} list list of dic elements to add [key,object]
 * @returns Object data object
 */
const defaltdata = (subtitle,list) => {
    let dic = { date : day, dath : dathcount, title: subtitle+title, insterurl: insterurl, footer:footer }
    list.forEach(el => {
        dic[el[0]] = el[1]
    })
    return dic
}

require('moment-timezone')
moment.tz.setDefault('Asia/Seoul')

app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, '/static')));


app.get('/', async(req,res) => {
    // console.log(day,dathcount);
    const data = require('./data/MainInfo.json').section
    day = data.day
    dathcount = data.dath
    res.render('main.ejs',defaltdata("WARINFO",[]))
})



app.get('/WarInfo', async(req,res) => {
    // console.log(day,dathcount);
    const WarInfo = require('./data/WarInfo.json')
    const section = WarInfo.section
    const process = section.process
    res.render('WarInfo.ejs',
        defaltdata(
            "WARINFO",
            [
                ["process",process],
                ["cause",section.cause]
            ]
        )
    )
})


app.get('/addinfo/herbseed', async(req,res) => {
    const maindata = require('./data/MainInfo.json')
    const query = req.query
    maindata.section.day = query.day.replace(' ','+')
    maindata.section.dath = query.dath
    // console.log('new data : ',maindata);
    fs.writeFileSync('./data/MainInfo.json',JSON.stringify(maindata))
    res.redirect('/')
})


app.get('/WarToKoreaInfo', async(req,res) => {
    const WarToKoreaInfo = require('./data/WarToKoreaInfo.json')
    const section = WarToKoreaInfo.section
    res.render('WarToKoreaInfo.ejs',defaltdata('KOREAR'))
})



app.get('/WhatCanWeDo', async(req,res) => {
    const WhatCanWeDo = require('./data/WhatCanWeDo.json')
    const section = WhatCanWeDo.section
    res.render('WhatCanWeDo.ejs',defaltdata("WHATCANWEDO"))
})



app.get('/Tree', async(req,res) => {
    const tree = require('./data/Tree.json')
    let i = 0
    let sender = []
    for(c in tree.content){
        console.log(tree.content)
        console.log(c);
        if(i <= 5){
            i++
            sender.push(c)
        }
    }
    res.render('Tree.ejs',defaltdata('TREE',[
        ['TreeContent',sender]
    ]) )
})

app.get('/Tree/addmsg', async(req,res) => {
    const query = req.query
    const name = query.name
    const msg = query.message
    const tree = require('./data/Tree.json')
    tree.content.push([randomUUID(),name,msg])
    fs.writeFile('./data/Tree.json',JSON.stringify(tree))
    res.redirect('/')
})



app.listen(8000, async() => {
    console.log('server is on 8000 ( http://localhost:8000 )')
    nowDate = moment().format('D DD')
    // await getinfo()
})
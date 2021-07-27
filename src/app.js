const express = require('express')
const path = require('path')
const app = express()
const hbs =  require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 5000
const public_dir =  path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialPath = path.join(__dirname, '../src/templates/partials')


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(public_dir))

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'weather  home',
        location: 'Boston',
        name:'the-tunwebdev'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'weather App',
        
        name:'the-tunwebdev'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'help page',
        name:'the-tunwebdev',


    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        error : 'help article not found',
        name : 'the-tunwebdev'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
// for wrong url 
app.get('*',(req,res)=>{
    res.render('error',{
        title :'404',
        error :  'page not found',
        name:'the-tunwebdev',
        
    })

})
app.listen(port,()=>{
    console.log('server started on port 3000')

})
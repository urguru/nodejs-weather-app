const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geoCode=require('./utils/geoCode')
const forecast=require('./utils/forecast')
const request=require('request')

// App creation
const app=express()


// Set Paths
const view_paths=path.join(__dirname,'../templates/views')
const partial_paths=path.join(__dirname,'../templates/partials')
const static_path=path.join(__dirname,'../public')

// App set
app.set('view engine','hbs')
app.set('views',view_paths)

//App use
app.use(express.static(static_path))
hbs.registerPartials(partial_paths)

//HomePage
app.get('',(req,res)=>{
    res.render('index',{
        title:'Know Your Weather'
    })
})


//The weather API
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You have to submit an address to see the results",
    });
  }
  geoCode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error: error });
    } else {
      forecast(data.latitude, data.longitude, (error, response) => {
        if (error) {
          return res.send({ error: error });
        } else {
          return res.send({
            ...response,
            address: req.query.address,
          });
        }
      });
    }
  });
});


//Starting the server
app.listen(3000,()=>{
    console.log("Servr is up and running")
})


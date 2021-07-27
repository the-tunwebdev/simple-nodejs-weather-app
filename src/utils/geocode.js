const request = require('request')
const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidGhlLXR1bndlYmRldiIsImEiOiJja3JpZmNyeW8waTV2MnBwdmwwMDB4dzRpIn0.c_G5SjkshBGypCYMktJ-dA`
    request({url : url , json :true},(err,res)=>{
        if(err){
            callback('unable to connect ')
        }else if (res.body.features.length === 0 ){
            callback('unable to find location')
        }else{
            callback(undefined,{
                latitude : res.body.features[0].center[1],
                longitude : res.body.features[0].center[0],
                location :  res.body.features[0].place_name


            })

        }

    })

}

module.exports = geocode
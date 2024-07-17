const getLocation =  ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position)
        })
    }
}

getLocation();
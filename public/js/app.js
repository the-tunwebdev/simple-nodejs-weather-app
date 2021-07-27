

console.log('client side')
const btn = document.getElementById('btn')
const input = document.getElementById('input')
const correct = document.getElementById('correct')
const error = document.getElementById('error')




btn.addEventListener('click',(e) => {
    e.preventDefault()
    correct.textContent = 'loading ....'
    error.textContent =''
    
    fetch(`http://localhost:5000/weather?address=${input.value}`)
    .then((response)=>{
        response.json()
        .then((data)=>{
            if(data.error){
               error.textContent =data.error
               correct.textContent =''

            }else{
                correct.textContent =data.location
                error.textContent = data.forecast
            }
        })
    })
    
    
})
store.subscribe(['INCREASE', 'DECREASE'], (state) => {
    document.getElementById('number').style.transform = 'scale(0.6)'
    setTimeout(() => {
        document.getElementById('number').innerHTML = state.main.number
        document.getElementById('number').style.transform = 'scale(1)'
    }, 200)
})
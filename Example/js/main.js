window.onload = () => document.getElementById('number').innerHTML = store.getState().main.number

const byValue = () => {
    let value = document.getElementById('by-value').value

    if (value) return Number(value)
    else return 1
}

const increase = () => store.disptach(increaseActionCreator(byValue()))

const decrease = () => store.disptach(decreaseActionCreator(byValue()))
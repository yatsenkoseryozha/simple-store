# ![](./icon.png) Simple Store
### Как построить гибкую и расширяемую систему для клиентской части веб-приложения, используя при этом всего три простых метода?
* Шаг первый - [Подключение библиотеки](#подключение-библиотеки)
* Шаг второй - [Настройка состояния](#настройка-состояния)
* Шаг третий - [Создание наблюдателей](#создание-наблюдателей)
* Шаг четвертый - [Управление состоянием](#управление-состоянием)

## Подключение библиотеки
Подключаем как внешний скрипт внутри тега `<head>` файла __index.html__:
```javascript
<script src="https://yatsenkoseryozha.github.io/simple-store/simple-store.js"></script>
```
Инициализируем экземпляр _Store_:
```javascript
const store = new SimpleStore()
```
## Настройка состояния
Первый метод, которым мы должны возспользоваться сразу после инициализации - `combineReducers`. 
```javascript
store.combineReducers({
    main: mainReducer
})
```
Этот метод сообщает _Store_ начальное состояние приложения и логику, которая будет это состояние изменять.  
  
В примере выше свойство `main` - состояние главной страницы приложения. Его значением является результат работы функции __reducer__.
### Что такое reducer?
__Reducer__ - это функция, возвращающая обновленное состояние приложения.
```javascript
const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INCREASE': {
            state.number = state.number + action.value

            return state
        }
        case 'DECREASE': {
            state.number = state.number - action.value

            return state
        } default: return state
    }
}
```
__Reducer__ принимает два параметра: 
1. Состояние приложения (__state__)
2. Название кейса с логикой, изменяющей состояние, и новые значения (__action__)  

Теперь подробнее. 
### Что такое __action__?
__Action__ - это объект, который должен обязательно содержать минимум одно свойство - `type`, а также может содержать новые данные для обновления состояния.  Создаются такие объекты с помощью функций __action creator__.
```javascript
const increaseActionCreator = (value) => ({ type: 'INCREASE', value })
```
__Action creator__ принимает в качестве параметров новые данные, а возвращает объект (__action__).
### Что такое state?
__State__ (_состояние_) - это данные, изменение которых вызовет изменение работы приложения.   
У __state__, который принимает __reducer__, всегда должно быть значение по умолчанию (из примера выше `state = initialState`).  
```javascript
let initialState = {
    number: 0
}
```
Для того, чтобы понять зачем это нужно, вернемся к `combineReducers`.  
  
Суть этого метода заключается в поочередном вызове всех перечисленных __reducer__ и записи результатов их работы в общий __state__ всего приложения.  
Когда `combineReducers` вызывает __reducer__, как __state__ он передает `undefined`, а в качестве __action__ `{ type: null }`. Такой подход заставляет __reducer__ использовать значение по умолчанию для __state__ и выполнить логику из кейса `default` (то есть вернуть __state__ без изменений).

<br>

Похоже, мы разобрались с тем, как сообщить _Store_ изначальное состояние приложения и как это состояние изменять. Теперь посмотрим как научить приложение реагировать на изменение состояния и, наконец, как это состояние изменить.

## Создание наблюдателей
__Наблюдатель__ - это функция, которая будет вызвана после изменения состояния приложения.
```javascript
store.subscribe(['INCREASE', 'DECREASE'], (state) => {
    document.getElementById('number').style.transform = 'scale(0.6)'
    setTimeout(() => {
        document.getElementById('number').innerHTML = state.main.number
        document.getElementById('number').style.transform = 'scale(1)'
    }, 200)
})
```
Получив новое состояние на входе, __наблюдатель__ обновляет интерфейс.  
  
__Наблюдатель__ передается вторым параметром в метод `subscribe`, который сообщает _Store_ о том, что этого __наблюдателя__ нужно будет вызвать, когда произойдет одно из событий, перечисленных в массиве, переданном первым параметром.

## Управление состоянием
> Никогда не обращайтесь к __state__ напрямую через `store`  и тем более не изменяйте его! Ваши __наблюдатели__ не узнают об этих изменениях. Текущее состояние приложения всегда можно получить с помощью метода `getState`.  

Для изменения состояния приложения используется метод `dispatch`.
```javascript
store.disptach(increaseActionCreator(value))
```
Этот метод поочередно вызывает те __reducer__, которые мы уже передали _Store_ с помощью `combineReducers`.  
  
Так как текущим состоянием приложения _Store_ тоже уже владеет, то единственное, что ему необходимо, это __action__, который нужно будет передать в __reducer__. Поэтому этот метод принимает на вход только один параметр - __action creator__.  
> Очень важно передавать __action creator__ вызывая его. Иначе в `dispatch` будет передана функция, а не результат её выполнения!  

<br>

Пожалуй, это всё, что нужно для того, чтобы ваш проект обладал всеми преимуществами, соотносящимися с понятием хорошая архитектура. 

<hr>  

Все примеры кода были взяты из простого [приложения](https://github.com/yatsenkoseryozha/simple-store/releases/download/v1.0/Example.rar), суть которого - изменение значения числа.

![](./Example/example.gif)

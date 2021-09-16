class SimpleStore {
    constructor() {
        this._state = {}
        this._subscribers = []
    }
    getState() {
        return this._state
    }
    combineReducers(reducers) {
        for (let key in reducers) {
            this._state[key] = reducers[key](undefined, { type: null })
            this._state[key].reducer = reducers[key]
        }
    }
    subscribe(actions, callback) {
        this._subscribers.push({ actions, callback })
    }
    _callSubscribers(action, state) {
        this._subscribers.map(subscriber => {
            if (subscriber.actions.some(subscriberAction => subscriberAction === action)) {
                subscriber.callback(state)
            }
        })
    }
    disptach(action) {
        for (let key in this._state) {
            this._state[key] = this._state[key].reducer(this._state[key], action)
        }
        this._callSubscribers(action.type, this._state)
    }
}
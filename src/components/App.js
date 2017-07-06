import React, { Component } from 'react'
import List from './List'

class App extends Component {
  state = {
    items: []
  }

  componentDidMount () {
    const url = 'https://one-list-api.herokuapp.com/items?access_token=tolkien'
    window.fetch(url)
      .then(r => r.json())
      .then(data => {
      //   console.log(data)
        // console.log('here')
        this.setState({
          items: data
        })
      })
  }

  addItem (newItem) {
    const url = 'https://one-list-api.herokuapp.com/items?access_token=tolkien'
    window.fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item: {
          text: newItem
        }
      })
    }).then(r => r.json())
      .then(data => {
        // console.log(data)
        this.setState({
          items: [...this.state.items, data]
        })
        console.log(this.state.items)
      })
  }

  toggleComplete = (index) => {
    // Make a copy of the items
    const newItems = this.state.items.slice()
    const item = newItems[index]
    item.complete = !item.complete
    const url = `https://one-list-api.herokuapp.com/items/${item.id}?access_token=tolkien`
    window.fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item: {
          complete: item.complete
        }
      })
    }).then(() => {
      this.setState({ items: newItems })
    })
  }

  _submit = (event) => {
    event.preventDefault()
    const input = this.refs.todoText
    this.addItem(input.value)
    input.value = ''
  }

  render () {
    return <div>
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <List
          items={this.state.items}
          toggleComplete={this.toggleComplete} />
        <form onSubmit={this._submit}>
          <input type='text' ref='todoText' />
        </form>
      </main>
    </div>
  }
}

export default App

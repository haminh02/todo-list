import './App.css';
import React from 'react';
import TodoItem from './components/TodoItem';
import add from './img/add.svg';

class App extends React.Component {
  constructor(){
      super();
      var dataString = localStorage.getItem('todoList');
      this.state=
      {
        currentState:'all',/// all , active, completed
        newItem:'',
        todoItems:(dataString?JSON.parse(dataString): [])
      }
      this.onKeyUp = this.onKeyUp.bind(this); 
      this.onChange = this.onChange.bind(this); 
      this.setAllCompleted = this.setAllCompleted.bind(this); 
      setInterval(() => {
        this.saveToLocalStorage();
      }, 50);
  }
  changeCurrnet(newCurrent){
    this.setState({
      currentState: newCurrent
    });
  }
  
  saveToLocalStorage(){
    localStorage.setItem('todoList', JSON.stringify(this.state.todoItems));
  }
  
  onItemClick(item){
    return (event)=>{
      const isComplete=item.isComplete;
      const {todoItems} = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems:[
          ...todoItems.slice(0,index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index+1)

        ]
      });
    }
  }
  onKeyUp(event){
    let text = event.target.value;
    if(event.keyCode===13){
      if(!text){return;}
      text=text.trim();
      if(!text){return;}
      this.setState({
        newItem:'',
        todoItems:[
          {
            title: text,
            isComplete: false
          },
          ...this.state.todoItems
        ]
      });
      this.saveToLocalStorage();
    }
  }

  onChange(event){
    this.setState({
      newItem:event.target.value
    });
  }

  setAllCompleted(){
    return (event)=>{
      this.state.todoItems.map((item,index) =>{
        const {todoItems} = this.state;
        const isComplete=item.isComplete;
        this.setState({
          todoItems:[
            ...todoItems.slice(0,index),
            {
              ...item,
              isComplete: true
            },
            ...todoItems.slice(index+1)
          ]
        });
      });      
      this.saveToLocalStorage();
    }
  }

  render(){
    const {todoItems, newItem, currentState} = this.state;
    return (
      <div className="App">
        <div className="Header">
          <img 
            src={add} 
            width = {30}
            eight={30}
            onClick={this.setAllCompleted}
          />
          <input 
            type="text" 
            placeholder="What need to be done?" 
            value={newItem}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
          />
        </div>
        <div className="Body">
          {
            todoItems.map((item,index) => (
            <TodoItem 
              key={index} 
              item={item}
              currentState={currentState}
              onClick={this.onItemClick(item)}
            />))
          }
        </div>
        <div className="Footer">
          <button type="button" className="btn btn-primary" onClick={()=>this.changeCurrnet('all')}>
            All
          </button>
          <button type="button" className="btn btn-primary" onClick={()=>this.changeCurrnet('active')}>
            Active
          </button>
          <button type="button" className="btn btn-primary" onClick={()=>this.changeCurrnet('completed')}>
            Completed
          </button>
        </div>
      </div>
    );
  }
}

export default App;

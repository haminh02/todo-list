import React from 'react';
import './TodoItems.css';
import checkImg from '../img/check.svg';
import checkdoneImg from '../img/check-done.svg';

class TodoItem extends React.Component {

    render(){
        const {item, onClick, currentState}= this.props;
        let url=checkImg;
        if(item.isComplete)url=checkdoneImg;
        let className='TodoItem';
        if(item.isComplete){
            className += ' TodoItem-complete'
        }
        if(currentState === 'all'
        ||(currentState === 'active' && item.isComplete=== false)
        ||(currentState === 'completed' && item.isComplete=== true)
        ){
            return (
                <div className={className}>
                    <img onClick={onClick} src={url} width = {30} height={30}/>
                    <p>{this.props.item.title}</p>
                </div>
            );
        }
        return (<div></div>);
    }
}
  
export default TodoItem;
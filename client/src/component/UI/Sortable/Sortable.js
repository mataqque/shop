import React, { Component } from 'react';
import { Sortable } from 'react-sortable'
class SortableContent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            items: this.props.data,
        };
        console.log('sortable content:',this.props)
    }
    
    onSortItems = (items) => {
        this.setState({items:items});
    };
    render() {   
      return (
            <ul className='sortable scroll small-select-to' id="tab-navigation-container">
                {
                    this.state.items.map((item,i)=>{
                        return(
                            <SortableItem 
                            key={i+"ul"}
                            onSortItems={this.onSortItems}
                            removeSlider={this.props.removeSlider}
                            addSlider={this.props.addSlider}
                            items={this.props.data}
                            sortId={i}
                            index={i}
                            >{item}
                            </SortableItem>
                        )
                    })
                }
                <div className='add-item-sortable' onClick={()=>{this.props.addSlider()}}>
                    <i className="fas fa-plus"></i>
                </div>
            </ul>
      )
    }
};

export default SortableContent



class Item extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log("itme",this.props)
    }
    moveElement =(element)=>{
        // console.log(element)
    }
    render() {
        return (
            <li className="item-sortable" {...this.props} key={this.props.index+"-li"}>
                <i className="fas fa-grip-vertical"></i>
                <span className='span-title'>{this.props.children.title}</span>
                <div className='btn-delete b-red c-white' onClick={()=>{this.props.removeSlider(this.props.index)}}>
                    <i className="far fa-trash-alt c-white" aria-hidden="true"></i>
                    <span className='span-title'>Eliminar</span>
                </div>
                <div className='btn-delete b-green c-white' onClick={()=>{this.props.addSlider(this.props.index)}}>
                    <i class="fas fa-pencil-alt c-white"></i>
                    <span className='span-title'>Editar</span>
                </div>
            </li>
        )
    }
}
   
   
  var SortableItem = Sortable(Item);
  
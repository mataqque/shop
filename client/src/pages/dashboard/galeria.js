import React, { Component } from 'react'
import axios from 'axios'
// import './galeria.scss'
export default class Galeria extends Component {
    constructor(props){
        super(props)
        this.state = {
            images: [],
            selected:[],
        }
    }
    componentDidMount(){
        this.updateImages()
    }
    updateImages=()=>{
        axios.get('/files/get-images').then(this.response)
    }
    response=(response)=>{ 
        this.setState({images:response.data,selected:[]})
    }
    
    onChange = (data) =>{
        var formData = new FormData();
        formData.append("archivo",data.target.files[0]);
        axios.post('/files/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then(this.updateImages);
    }
    selected = (image) =>{
        let newArray = this.state.selected
        let value = newArray.map((e)=>{return e.id_file}).includes(image.id_file)
        if(value){
            newArray.forEach((value, index )=>{
                if(value.id_file == image.id_file){
                    newArray.splice(index, 1);
                }
            });
        }else{
            newArray.push(image)
        }
        
        this.setState({selected:newArray})
    }
    deleteFiles=()=>{
        axios.post('/files/delete',this.state.selected).then(this.updateImages);
    }
    handleItemActive = (selected,image)=>{
        let value =  selected.map((e)=>{return e.id_file}).includes(image.id_file)
        return value
    }
    render() {
        return (
            <div className="features">
                <div className='content-features-galery scroll'>
                    <div className='title-component'>
                        Caracteristicas de Medios
                        <p className='paragraph'>Gestiona todos los archivos multimedia de tu sitio, incluyendo imágenes, vídeos, y más. Más información.</p>
                    </div>
                    <div className='nav-features'>
                        <div className='btn-features active'>
                            <span className='top-font'>
                                Todos
                            </span>
                        </div>
                        <div className='btn-features'>
                            <span className='top-font'>
                                Imágenes 
                            </span>
                        </div>
                        <div className='btn-features'>
                            <span className='top-font'>
                                Documentos 
                            </span>
                        </div>
                        <div className='btn-features'>
                            <span className='top-font'>
                                Videos 
                            </span>
                        </div>
                        <div className='btn-features'>
                            <span className='top-font'>
                                Audio 
                            </span>
                        </div>
                    </div>
                    <form className='nav-features' onChange={this.onChange} encType="multipart/form-data">
                        <input name="archivo" type="file" id="file" multiple='multiple'/>
                        <label htmlFor="file" className='add-file bcolor1'>
                            <i className="fas fa-upload"></i>
                            <span className='top-font'>Agregar Medio</span>
                        </label>
                        <label className={`add-file b-green ${this.state.selected.length > 0 ? '' : 'opacity'}`}>
                            <i className="fas fa-pen"></i>
                            <span className='top-font'>Editar</span>
                        </label>
                        <label className={`add-file b-red ${this.state.selected.length > 0 ? '' : 'opacity'}`} onClick={()=>{this.deleteFiles()}}>
                            <i className="far fa-trash-alt"></i>
                            <span className='top-font'>Eliminar</span>
                        </label>
                        
                    </form>
                    <div className='__images scroll'>
                        <div className='content-all-images '>
                            {
                                this.state.images.length > 0 ? 
                                this.state.images.map((image,index)=>{
                                    return (
                                        <div className={`content-img-item ${this.handleItemActive(this.state.selected,image) ? 'active' : ''}`} onClick={()=>{this.selected(image)}} key={'images-'+index}>
                                            <img className='img' src={`${process.env.NODE == 'produccion' ? '/api':''}/images/${image.filename}`} ></img>
                                            <div className='check'>
                                                <i className="fas fa-check"></i>
                                            </div>
                                        </div>
                                    )
                                }) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

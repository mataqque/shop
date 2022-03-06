import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { closeGallery, insertImage} from '../../data/galleryModal'

// import './galeria.scss'
class GaleriaModal extends Component {
    constructor(props){
        super(props)
        // this.selected = this.selected.bind(this)
        this.state = {
            images: [],
            selected:[],
            selectedImage:"",
        }
    }
    componentDidMount(){
        axios.get('/files/get-images').then(this.response)
    }
    response = (response) =>{ 
        this.setState({images:response.data})
    }
    updateImages=()=>{
        axios.get('/files/get-images').then(this.response)
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
        let value = newArray.includes(image.id_file)
        if(value){
            newArray.forEach((value, index )=>{
                if(value == image.id_file){
                    newArray.splice(index, 1);
                }
            });
        }else{
            newArray.push(image.id_file)
        }
        
        this.setState({selected:newArray})
    }
    selectOneOfAll =(image)=>{
        let newArray = this.state.selected
        let value = newArray.includes(image.id_file)
        if(value){
            newArray.forEach((value, index )=>{
                if(value == image.id_file){
                    newArray.splice(index, 1);
                }
            });
        }else{
            newArray = [image.id_file,]
        }
        
        this.setState({selected:newArray,selectedImage:image})
    }
    deleteFiles=()=>{
        axios.post('/files/delete',this.state.selected).then(this.updateImages);
    }
    render() {
        return (
            <div className='gallery-modal'>
                <div className='close mask' onClick={()=>{this.props.closeGallery()}}>
                </div>
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
                                            <div className={`content-img-item ${this.state.selected.includes(image.id_file) ? 'active' : ''}`} onClick={()=>{this.selectOneOfAll(image)}} key={'all-images-'+index}>
                                                <img className='img' src={`/images/${image.filename}`} ></img>
                                                <div className='check'>
                                                    <i className="fas fa-check"></i>
                                                </div>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                        </div>
                        <div className='insert__image'>
                                <div className='btn radius bcolor1 c-white cancel px-1 mr-1 py--5' onClick={()=>{this.props.closeGallery()}}>
                                    CANCELAR
                                </div>
                                <div className='btn radius bcolor1 c-white insert px-1 py--5 ' onClick={()=>{this.props.insertImage(this.state.selectedImage)}}>
                                    INSERTAR
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const MapStateProps = (state) =>{
    return({
        show:state.dashboardStore.showModalGalerry
    })
}
export default connect(MapStateProps,{closeGallery,insertImage})(GaleriaModal)
import React, { Component, useCallback, useState} from 'react';
import SortableContent from '../../component/UI/Sortable/Sortable';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { showGallery} from '../../data/galleryModal';
import { setEditSlider, insertImageSlider} from '../../data/components/sliderMain';
import { onchange,getData,addSlider,removeSlider,onSortItems,addImageSelected,addImageSelectedDropzone} from '../../data/components/sliderMain';
import axios from 'axios';
class SliderMain extends Component {
    constructor(props){
        super(props)
        this.editSlider = this.editSlider.bind(this)
        this.handleSubmitSlider = this.handleSubmitSlider.bind(this)
        this.state = {
            activeEdit:true,
            disabled:false,
        }
    }
    componentDidUpdate(prevProps){
        if (this.props.type !== prevProps.type) {
            console.log('tipo',this.props.type);

            this.getDataSlider()
        }

    }
    componentDidMount(){
        this.getDataSlider()
    }
    
    getDataSlider = _ => {
        axios.post('/slider/getSliders',{type: this.props.type}).then(({data}) => this.props.getData({data: data}))
    }

    editSlider(item){
        this.setState({activeEdit:true})
        this.props.setEditSlider(item)
    }

    handleSubmitSlider(){
        this.setState({disabled:true});
        
        axios.post('/slider/update',{data: this.props.slider.data, type: this.props.type})
            .then(this.getResponse)
    }

    getResponse =(response)=>{
        this.setState({disabled:false})
        alert(response.data)
    }

    getImage =(data)=>{
        let time = setInterval(() => {
            this.props.addImageSelected(data)
            clearInterval(time)
        }, 400);
    }
    
    render(){
        return (
            <div className="features content-sliders">
                <div className='content-features-galery'>
                    <div className="title-component">
                        Slider principal
                        <p className="paragraph">Edita los sliders de todas las páginas en orden de lista.</p>
                    </div>
                    <div className='content-features'>
                        <div className='content-sortable'>
                            <div className='header-sortable'>
                                Lista de imágenes
                            </div>
                            <SortableContent
                                onSortItems={this.props.onSortItems}
                                addSlider={this.props.addSlider}
                                editSlider={this.editSlider}
                                removeSlider={this.props.removeSlider}
                                data={this.props.slider.data}
                                key={new Date().getTime()}
                                type={this.props.type}
                            ></SortableContent>
                        </div>
                        <div className='option-sortable-image'>
                            <div className='header-sortable'>
                                Información del item
                            </div>
                            <div className={`scroll ${this.state.activeEdit == false ? 'inactive' : ''}`}>
                                <div className='content-option-images'>
                                    <div className='flex-column'>
                                        <span className='title-option-image'><strong> Nombre de imagen</strong></span>
                                        <input placeholder={this.props.slider.sectionEdit.title} value={this.props.slider.sectionEdit.title}
                                        onChange={(e)=>{this.props.onchange({target:e,title:'title',item:this.props.slider.sectionEdit})}}
                                        ></input>
                                    </div>
                                    <div className='flex-column'>
                                        <span className='title-option-image'><strong>Atributo alt </strong></span>
                                        <input placeholder={this.props.slider.sectionEdit.alt} value={this.props.slider.sectionEdit.alt}
                                        onChange={(e)=>{this.props.onchange({target:e,title:'alt',item:this.props.slider.sectionEdit})}}
                                        ></input>
                                    </div>
                                    <div className='flex-column'>
                                        <span className='title-option-image'><strong>Link</strong></span>
                                        <input placeholder={this.props.slider.sectionEdit.link} value={this.props.slider.sectionEdit.link}
                                        onChange={(e)=>{this.props.onchange({target:e,title:'link',item:this.props.slider.sectionEdit})}}
                                        ></input>
                                    </div>
                                    <div className='flex-column'>
                                        <span className='title-option-image'><strong>Parrafo</strong></span>
                                        <input placeholder='Introduce el parrafo' value={this.props.slider.sectionEdit.paragraph}
                                        onChange={(e)=>{this.props.onchange({target:e,title:'paragraph',item:this.props.slider.sectionEdit})}}
                                        ></input>
                                    </div>
                                    <div className='flex-column '>
                                        <span className='title-option-image'><strong>Icono</strong></span>
                                        {
                                            console.log(this.props.slider.sectionEdit)
                                        }
                                        <div className='content-icon'>
                                        {
                                            <MyDropZone data={{item:this.props.slider.sectionEdit,typeImage:'icon'}} ></MyDropZone>
                                        }
                                        </div>
                                        <div className='select_to_gallery bcolor1 c-white radius' 
                                            onClick={()=>{this.props.showGallery({action:this.getImage,description:'icon'})}}>
                                            Selecciona desde la Galeria
                                        </div>
                                    </div>
                                </div>
                                <div className='upload-images'>
                                    <div className='upload-image-desktop'>
                                        <span className='title-upload'>Imagen Desktop</span>
                                        {
                                            <MyDropZone data={{item:this.props.slider.sectionEdit,typeImage:'imageDesk'}} ></MyDropZone>
                                        }
                                        <div className='select_to_gallery bcolor1 c-white radius' 
                                            onClick={()=>{this.props.showGallery({action:this.getImage,description:'imageDesk'})}}>
                                            Selecciona desde la Galeria
                                        </div>
                                    </div>
                                    <div className='upload-image-movil'>
                                        <span className='title-upload'>Imagen Movil</span>
                                        {
                                            <MyDropZone data={{item:this.props.slider.sectionEdit,typeImage:'imageMobile'}}></MyDropZone>
                                        }
                                        <div className='select_to_gallery bcolor1 c-white radius'
                                             onClick={()=>{this.props.showGallery({action:this.getImage,description:'imageMobile'})}}
                                        >
                                            Selecciona desde la Galeria
                                        </div>
                                    </div>
                                </div>
                                <div className='content-option-images content-btn-button'>
                                    <div className={`btn-submit bcolor1 c-white ${this.state.disabled == true ? 'disabled' : ''}`} onClick={(e)=>{this.handleSubmitSlider(this)}}>
                                        <span className='span-title'>
                                            Guardar cambios
                                        </span>
                                    </div>
                                </div>
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
        slider:state.slider
    })
};
export default connect(MapStateProps,{
    showGallery,setEditSlider,onchange,getData,
    addSlider,removeSlider,insertImageSlider,onSortItems,
    addImageSelected
})(SliderMain);

class MyDropzone extends Component{
    constructor(props){
        super(props)
          this.state = {
            files: [],
            image: '',
          };
    }
    getImage =(data)=>{
        let time = setInterval(() => {
            this.props.addImageSelected(data)
            clearInterval(time)
        }, 400);
    }
    onDrop = (file) => {
        console.log(file[0])
        let reader = new FileReader();
        reader.readAsText(file[0]);
        reader.onload = () => {
            // this.setState({image: URL.createObjectURL(file[0])})
            let image = URL.createObjectURL(file[0])
            this.props.addImageSelectedDropzone({description:this.props.data.typeImage,image:image})
        }
    }
    render(){
        return (
            <Dropzone onDrop={this.onDrop}>
                {
                    ({getRootProps, getInputProps, isDragActive})=>(
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className={`content-img ${isDragActive ? 'active' : ''}`}>
                                <div className='icon upload mask'>
                                </div>
                                <span className='message'>
                                    <strong> Arrastra tu imagen</ strong>o importalo desde el explorador de archivos
                                </span>
                                {
                                    this.props.slider.sectionEdit[this.props.data.typeImage].length == 0 ? null : 
                                    <img className='img-upload'  src={this.props.slider.sectionEdit[this.props.data.typeImage]}></img>
                                }
                            </div>
                        </div>
                    )
                }
            </Dropzone>
        )
    }
};

const MapStatePropsDropzone = (state) =>{
    return({
        slider:state.slider
    })
};
const MyDropZone = connect(MapStatePropsDropzone,{onchange,addImageSelected,showGallery,addImageSelectedDropzone})(MyDropzone)
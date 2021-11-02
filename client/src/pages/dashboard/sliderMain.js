import React, { Component, useCallback} from 'react';
import SortableContent from '../../component/UI/Sortable/Sortable';
import { connect } from 'react-redux';
import {useDropzone} from 'react-dropzone';
import { showGallery} from '../../data/galleryModal';
import { setEditSlider, insertImageSlider} from '../../data/components/sliderMain';
import { onchange,getData,addSlider,removeSlider,onSortItems} from '../../data/components/sliderMain';
import axios from 'axios';
class SliderMain extends Component {
    constructor(props){
        super(props)
        this.editSlider = this.editSlider.bind(this)
        this.state = {
            activeEdit:false,
            data:[
                {id:1,imageDesk:'/images/947119258-Astronaut-Wallpaper.jpg',imageMobile:"",title:'Nombre-1',alt:'Descipción Alt'},
                {id:2,imageDesk:'/images/947119258-Astronaut-Wallpaper.jpg',imageMobile:"",title:'Nombre-2',alt:'Descipción Alt'},
            ]
        }
        console.log('slider-main',this.props)
    }
    componentDidMount(){
        axios.get('/api/get-sliders').then(this.getDataSlider)
    }
    getDataSlider =(response)=>{
        this.props.getData({data:response.data})
    }
    
    editSlider(item){
        this.setState({activeEdit:true})
        this.props.setEditSlider(item)
    }
    handleSubmitSlider(){
        axios.post('/api/add-slider',this.props.slider.data).then(this.response)
    }
    response = (response) =>{ 
        console.log(response.data)
        alert('save')
    }
    render(){
        return (
            <div className="features content-sliders">
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
                                    <span className='title-option-image'><strong>Descripción del alt-imagen </strong></span>
                                    <input placeholder={this.props.slider.sectionEdit.alt} value={this.props.slider.sectionEdit.alt}
                                    onChange={(e)=>{this.props.onchange({target:e,title:'alt',item:this.props.slider.sectionEdit})}}
                                    ></input>
                                </div>
                            </div>
                            <div className='upload-images'>
                                <div className='upload-image-desktop'>
                                    <span className='title-upload'>Imagen Desktop</span>
                                    {
                                        this.props.slider.sectionEdit.imageDesk.length > 5 ?
                                        <div className='content-img'>
                                            <img className='img' src={this.props.slider.sectionEdit.imageDesk} ></img> 
                                        </div> :
                                        <MyDropzone></MyDropzone>
                                    }
                                    <div className='select_to_gallery bcolor1 c-white radius'>
                                        Selecciona desde la Galeria
                                    </div>
                                </div>
                                <div className='upload-image-movil'>
                                    <span className='title-upload'>Imagen Movil</span>
                                    {
                                        this.props.slider.sectionEdit.imageMobile.length > 5 ?
                                        <div className='content-img'>
                                            <img className='img' src={this.props.slider.sectionEdit.imageMobile} ></img> 
                                        </div> :
                                        <MyDropzone></MyDropzone>
                                    }
                                    <div className='select_to_gallery bcolor1 c-white radius' >
                                        Selecciona desde la Galeria
                                    </div>
                                </div>
                            </div>
                            <div className='content-option-images content-btn-button'>
                                <div className='btn-submit bcolor1 c-white' onClick={()=>{this.handleSubmitSlider()}}>
                                    <span className='span-title'>
                                        Guardar cambios
                                    </span>
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
export default connect(MapStateProps,{showGallery,setEditSlider,onchange,getData,addSlider,removeSlider,insertImageSlider,onSortItems})(SliderMain);

function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader()
    
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
          // Do whatever you want with the file contents
            const binaryStr = reader.result
            console.log(acceptedFiles)
          }
          reader.readAsArrayBuffer(file)
        })
        
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {/* {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        } */}
         <div className={`content-img ${isDragActive ? 'active' : ''}`}>
            <div className='icon upload mask'>
            </div>
            <span className='message'>
                <strong> Arrastra tu imagen</ strong>o importalo desde el explorador de archivos
            </span>
        </div>
      </div>
    )
};
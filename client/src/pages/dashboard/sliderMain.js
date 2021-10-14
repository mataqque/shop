import React, { Component, useCallback} from 'react';
import SortableContent from '../../component/UI/Sortable/Sortable';
import {useDropzone} from 'react-dropzone';


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
  }

export default class SliderMain extends Component {
    constructor(props){
        super(props)
        this.addSlider = this.addSlider.bind(this)
        this.removeSlider = this.removeSlider.bind(this)
        this.onSortItems = this.onSortItems.bind(this)
        this.state = {
            data:[
                {title:"slider 1"},
                {title:"slider 2"},
                {title:"slider 3"},
            ]
        }
    }
    addSlider(){
        let newArray = this.state.data;
        console.log(newArray)
        newArray.push({title:`Slider ${newArray.length+1}`})
        this.setState({data:newArray})
    }
    
    removeSlider(id){
        console.log(id)
        let getArray = this.state.data;
        let newArray = getArray.filter((i,index) => index != id)
        console.log(newArray)
        this.setState({data:newArray})
    }
    onSortItems(items){
        console.log(items)
        // this.setState({
        //   data: items
        // });
      }
    render() {
        return (
            <div className="features content-sliders">
                <div className="title-component">
                    Slider principal
                    <p class="paragraph">Edita los sliders de todas las páginas en orden de lista.</p>
                </div>
                <div className='content-features'>
                    <div className='content-sortable'>
                        <div className='header-sortable'>
                            Lista de imágenes
                        </div>
                        <SortableContent 
                        addSlider={this.addSlider}
                        removeSlider={this.removeSlider}
                        data={this.state.data}
                        key={new Date().getTime()}
                        ></SortableContent>
                    </div>
                    <div className='option-sortable-image'>
                        <div className='header-sortable'>
                            Información del item
                        </div>
                        <div className='scroll'>
                            <div className='content-option-images'>
                                <div className='flex-column'>
                                    <span className='title-option-image'><strong> Nombre de imagen</strong></span>
                                    <input placeholder="nombre"></input>
                                </div>
                                <div className='flex-column'>
                                    <span className='title-option-image'><strong>Descripción del alt-imagen </strong></span>
                                    <input placeholder="Alt"></input>
                                </div>
                                <div className='flex-column'>
                                    <span className='title-option-image'><strong>Nombre de imagen</strong></span>
                                    <input placeholder="nombre"></input>
                                </div>
                            </div>
                            <div className='upload-images'>
                                <div className='upload-image-desktop'>
                                    <span className='title-upload'>Imagen Desktop</span>
                                    <div className='content-img'>
                                        <div className='icon upload mask'>
                                        </div>
                                        <span className='message'>
                                        <strong> Arrastra tu imagen</ strong>o importalo desde el explorador de archivos
                                        </span>
                                    </div>
                                </div>
                                <div className='upload-image-movil'>
                                    <span className='title-upload'>Imagen Movil</span>
                                    <MyDropzone></MyDropzone>
                                </div>
                            </div>
                            <div className='content-option-images'>
                                <div className='btn-submit bcolor1 c-white'>
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

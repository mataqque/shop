import React, { Component } from 'react'
import axios from 'axios'
// import './galeria.scss'
export default class Galeria extends Component {
    onChange = (data) =>{
        var formData = new FormData();
        formData.append("archivo",data.target.files[0]);
        axios.post('/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
    }
    render() {
        return (
            <div className="features">
                <div className='content-features-galery'>
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
                        <label htmlFor="file" className='add-file'>
                            <i className="fas fa-upload"></i>
                            <span className='top-font'>Agregar Medio</span>
                        </label>
                    </form>
                </div>
            </div>
        )
    }
}

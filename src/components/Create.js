//Importar hooks, useNavigate de react
//Importar Data Base(bd) de la configuracion de firebase
//Importar funciones de firebase para la coleccion y añadir datos
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {collection, addDoc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'



const Create = () => {
    //Creacion de atributos por hooks
    const[name,setName]=useState( '' )
    const[career,setCareer]=useState( '' )
    const[university,setUniversity]=useState( '' )
    const[age,setAge]=useState(0)
    const navigate =useNavigate()

    //Creacion de coleccion
    const personCollection = collection(db,"persons")
    //Metodo para guardar personas
    const save= async(e)=>{
      //Prevencion de errores  
      e.preventDefault()
      //Enviar atributos a firebase
      await addDoc(personCollection,{name: name,age:age , career:career, university:university})
      //Volver a la ruta principal 
      navigate('/')
    }
    //Formulario de HTML para obtener la informacion y se asignan a la persona
    //Uso de estilos de bootstap para el formulario
    return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1>Crate Person</h1>
            <form onSubmit={save}>
                <div className='mb-3'>
                    <label className='form-label'>Person Name</label>
                    <input value={name} onChange={ (e)=> setName(e.target.value) } type="text" className='form-control'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Person Age</label>
                    <input value={age} onChange={ (e)=> setAge(e.target.value) } type="number" className='form-control'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Career</label>
                    <input value={career} onChange={ (e)=> setCareer(e.target.value) } type="text" className='form-control'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>University</label>
                    <input value={university} onChange={ (e)=> setUniversity(e.target.value) } type="text" className='form-control'></input>
                </div>
                <button type='submit' className='btn btn-dark'>Add Person</button>
            </form>
          </div>
        </div>
      </div>
    </>
    )
}

export default Create
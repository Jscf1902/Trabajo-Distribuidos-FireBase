//Importar hooks, useNavigate y useParamsde react
//Importar Data Base(bd) de la configuracion de firebase
//Importar funciones de firebase para la coleccion, obtener y actualizar datos
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'


const Edit = () => {
    //Creacion de atributos por hooks
    const[name,setName]=useState( '' )
    const[age,setAge]=useState(0)
    const[career,setCareer]=useState( '' )
    const[university,setUniversity]=useState( '' )
    const navigate =useNavigate()
    const {id} = useParams()

    //Metodo Update para actualiazr por id los atributos
    const update =async (e)=>{
        //Prevencion de errores  
        e.preventDefault()
        //Conectar con la DB
        const person = doc(db,"persons",id)
        //Actualizar informacion mediante la funcion updateDoc de firebase
        const data = {name: name,age:age , career:career, university:university}
        await updateDoc(person, data)
        //Volver a la ruta principal 
        navigate('/')
    }

    //Metodo para obtener la persona por el id
    const getPerson =async (id)=>{
        const person = await getDoc(doc(db,"persons",id))
        //validacion que la persona existe
        if(person.exists())
        {
            setName(person.data().name)
            setAge(person.data().age)
            setCareer(person.data().career)
            setUniversity(person.data().university)
        }else{
            console.log("person not exist")
        }
    }
    //UseEffect
    useEffect( ()=>{
        getPerson(id)
    }, []) 

    //Formulario de HTML para obtener la informacion y se asignan a la persona para que se actualicen
    //Uso de estilos de bootstap para el formulario
    return (
        <>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <h1>Edit Person</h1>
                <form onSubmit={update}>
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
                <button type='submit' className='btn btn-dark'>Edit Person</button>
            </form>
              </div>
            </div>
          </div>
        </>
        )
}

export default Edit
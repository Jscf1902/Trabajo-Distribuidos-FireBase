//Importar hooks, link de react
//Importar Data Base(bd) de la configuracion de firebase
//Importar funciones de firebase para la coleccion y obtener datos
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
//Importar SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal =withReactContent(Swal)

const Show = () => {
    //Configurar hooks
    const[persons,setPersons]=useState( [] )

    //Db de firestore
    const personCollection = collection(db,"persons")

    //Visualizar persona
    const getPersons=async()=>{
        //Obeter la data globar y luego guardar los atributos
        const data = await getDocs(personCollection)
        setPersons( 
            data.docs.map( (doc)=> ( {...doc.data(), id:doc.id}))
        )
    } 
    //Eliminar persona por su ID
    const deletePerson = async (id)=> {
      const personDoc = doc(db,"persons", id)
      await deleteDoc(personDoc)
      getPersons()
    }
    //Usar SweetAlert validar eliminacion de la persona
    //Codigo obtenido de la documentacion de SweetAlet https://sweetalert2.github.io/
    const confirmDelete = (id) =>{
      MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deletePerson(id)
          MySwal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
    //useEffect
    useEffect( ()=>{
        getPersons()
    }, []) 

  //Tabla de visualizacion con acciones de eliminar y editar personas
  //Uso de estilos de bootstap para la tabla

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1>Firebase Crud Persons</h1>
            <table className='table'>
              <thead>
                <tr className='table table-dark table-hover'>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Career</th>
                  <th>University</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                { persons.map( (person)=>(
                  <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.age}</td>
                    <td>{person.career}</td>
                    <td>{person.university}</td>
                    <td>
                      <Link to={`/edit/${person.id}`} className='btn btn-dark'><i className="fa-solid fa-user-pen"></i></Link>
                      <button onClick={ ()=>{confirmDelete(person.id)} } className='btn btn-danger'><i className="fa-solid fa-user-minus"></i></button>
                    </td>
                  </tr>
                ) ) }
              </tbody>
            </table>
            <div className="d-grid grab-2">
              <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Add Person</Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3">
         | Juan Sebastian Castiblanco Fonseca | Utadeo 2022 | Sistemas distribuidos |
        </div>
      </footer>
    </>

  )

}

export default Show
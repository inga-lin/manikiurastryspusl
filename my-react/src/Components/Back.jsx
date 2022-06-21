import { useEffect, useState } from 'react';//2 bendraujam su serveriu
import axios from 'axios';//2 bendraujam su serveriu
import '../Back.css';
import Create from './Back/Create';
import ManikiuroListoAtvaizdavimas from './Back/ManikiuroListoAtvaizdavimas';
import Modal from './Back/Modal';
//import './bootstrap.css';



function Back() {

  const [manikiuras, setManikiuras] = useState([]);//2 bendraujam su serveriu ir issitraukiam info
  
  const [createData, setCreateData] = useState(null);//3.mygtuko paspaudimas- kuris is Create.jsx paims informaciaj (kai paspausim mygtuka) ir ja issius ir irasys i serveri
 
  //4. vieta is kurios gausim sarasiuka
  const [lastUpdate, setLastUpdate] = useState(Date.now()); //4.cia bus laikas kada pirma karta reactasparsisiunte duomenis

  ////6.Istrinimo mygtukas is ManikiuroListoAtvaizdavimas.jsx kuris istrins visa eilutes info 
  const[istrintiId, setIstrintiId] = useState(null);

  ////7.redagavimao mygtukas ManikiuroListoAtvaizdavimas.jsx ir modalo atvaizdavimas
  const [redaguotiModalData, setRedaguotiModalData] = useState(null);//10. ir ji perduosim per Modal ir ten pasiimsim

  //8 Create paspaudus redaguoti mygtuka.....
  const [redaguotiCreateData, setRedaguotiCreateData] = useState(null);

 //Read //2 bendraujam su serveriu ir issitraukiam info is savo D.B.///////
  useEffect(() => { //2 bendraujam su serveriu ir issitraukiam info is savo D.B.///////
    axios.get('http://localhost:3003/manikiuro-salonas')
    .then(res => {
      console.log(res.data);//2 bendraujam su serveriu ir issitraukiam info 
      setManikiuras(res.data);//2 bendraujam su serveriu ir issitraukiam info 
    })
  },[lastUpdate]);//4




  //Create lenteles itasymas
  //3.mygtuko paspaudimas- kuris is Create.jsx paims informaciaj (kai paspausim mygtuka) ir ja issius ir irasys i serveri////
  useEffect(() => {
    if (null === createData) { //3)jeigu createData yra === null nieko nedarom ir einam lauk is cia
      return;
    }
    axios.post('http://localhost:3003/manikiuro-salonas', createData)//3)kai jis  jau tures kazka naujo tai ta nauja info dedam i 'http://localhost:3003/trees-manager', createData //post-isiusti
    .then(res => {
      console.log(res);  //3)console.log(res) pasiziurim ka mums servas atsakys
      setLastUpdate(Date.now()); //4
     }); 
  },[createData]);



//deletle-mygtukas
  ////6.Istrinimo mygtukas is ManikiuroListoAtvaizdavimas.jsx kuris istrins visa jo info///
  useEffect(() => {
    if (null === istrintiId) { //6)jeigu createData yra === null nieko nedarom ir einam lauk is cia
      return;
    }
    axios.delete('http://localhost:3003/manikiuro-salonas/' + istrintiId.id, ) //!!!!nepamirsti gale prideti /  prie manikiuro-salonas/  
    .then(res => {
      console.log(res); 
      setLastUpdate(Date.now()); //4
     }); 
  },[istrintiId]);



 ////7.redagavimao mygtukas ManikiuroListoAtvaizdavimas.jsx ir modalo atvaizdavimas
 //useEffect(() => {
  //if (null === setCreateData) {
 //   return;
  //}
 // axios.put('http://localhost:3003/manikiuro-salonas/'+ setCreateData.id, setCreateData) //
  //.then(res => {
  //  console.log(res);
 //   setLastUpdate(Date.now());//7paskutinis pakeitimas turi buti dabartine Data
 // });
//
//},[setCreateData]);


//edit(redaguoti) mygtukas
////8.Create paspaudus redaguoti(edit) Modale keiciami duomenys ir atvaizduojami Creat o liste/////
useEffect(() => {
  if (null === redaguotiCreateData) { //3)jeigu createData yra === null nieko nedarom ir einam lauk is cia
    return;
  }
  axios.put('http://localhost:3003/manikiuro-salonas/' + redaguotiCreateData.id, redaguotiCreateData)//3)kai jis  jau tures kazka naujo tai ta nauja info dedam i 'http://localhost:3003/trees-manager', createData //post-isiusti
  .then(res => {
    console.log(res);  //3)console.log(res) pasiziurim ka mums servas atsakys
    setLastUpdate(Date.now()); //4
   }); 
},[redaguotiCreateData]);


  return (
    <>
    <div className="p-contai">
      <div className="stulpeliu-tevas">
        <Create setCreateData={setCreateData}></Create>{/*3.setCreateData*/}
        <div className="stulpeliu-vaikas1">
          <div className="titleee">
            <h2>Manikiuras list</h2>
          </div>
          <div className="sarasas">
            <ul className='ul' >
              {
                 manikiuras.map(m => <ManikiuroListoAtvaizdavimas key={m.id} manikiuras={m}setIstrintiId={setIstrintiId} setRedaguotiModalData={setRedaguotiModalData}></ManikiuroListoAtvaizdavimas>)//2 bendraujam su serveriu ir issitraukiam info//5. ManikiuroListoAtvaizdavimas//6.setIstrintiId istrinsim eilutes info
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Modal setRedaguotiModalData={setRedaguotiModalData} redaguotiModalData={redaguotiModalData} setRedaguotiCreateData={setRedaguotiCreateData}></Modal>{/*8.setRedaguotiCreateData //7.redaguotiModalData//7.setRedaguotiModalData*/}
    </>
  );
}

export default Back;
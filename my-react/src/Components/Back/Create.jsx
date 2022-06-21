import { useState } from "react";

import { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";//susiimportint <Link>
//3
//////////////
//cia paprastai uzpildom ir niekur nenumeta
function Create() {
    //kiek laukeliu returne tiek turim tureti useState(react xxx)
    const [ vardas, setVardas] = useState('');
    const [ tipas, setTipas] = useState("1");
    const [ kaina, setKaina] = useState('');
    const [ trukme, setTrukme] = useState('');
    const [ nuotrauka, setNuotrauka] = useState('');


    //////
    const [createData, setCreateData] = useState(null);
    const [manikiuras, setManikiuras] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(Date.now());
     //Read //2 bendraujam su serveriu ir issitraukiam info is savo D.B.///////
  useEffect(() => { //2 bendraujam su serveriu ir issitraukiam info is savo D.B.///////
    axios.get('http://localhost:3003/manikiuro-salonas')
    .then(res => {
      console.log(res.data);//2 bendraujam su serveriu ir issitraukiam info 
      setManikiuras(res.data);//2 bendraujam su serveriu ir issitraukiam info 
    })
  },[lastUpdate]);//4
  //Create lenteles itasymas
 // 3.mygtuko paspaudimas- kuris is Create.jsx paims informaciaj (kai paspausim mygtuka) ir ja issius ir irasys i serveri////
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
    /////

////////////////////////
/////////////////////////
    //cia uzpildzius lentele grazins i pradini puslapi
    //import { useNavigate } from "react-router-dom";
    //function Create() {
        //kiek laukeliu returne tiek turim tureti useState(react xxx)
    //const [ vardas, setVardas] = useState('');
   // const [ tipas, setTipas] = useState("1");
    //const [ kaina, setKaina] = useState('');
   // const [ trukme, setTrukme] = useState('');
    //const [ nuotrauka, setNuotrauka] = useState('');
    //const [createData, setCreateData] = useState(null);

    //let navigate =useNavigate()
   // useEffect(() => {
     //   if (null === createData) {
     //     return;
     //   }
      //  axios.post('http://localhost:3003/manikiuro-salonas', createData)
     //   .then(res => {
     //     console.log(res);
          //setLastUpdate(Date.now());
       //   navigate('/');
    
      //  });
   // },[createData]);
//////////////////////////
//////////////////////////
    //3.kas nutiks kai paspausiu mygtuka(issisaugos sita info)
    const buttonHandler = () => {
        setCreateData({
            vardas,
            tipas,
            kaina,
            trukme,
            nuotrauka
        });
        setVardas('');//cia kai uzpildysim lentele ji nusiresetins i tuscius laukelius
        setTipas('1');
        setKaina('');
        setTrukme('');
        //setNuotrauka('');
    }

    const inputHandler =(e, kuriKontruoliuosim) => {//kontroliuosim ivedimo laukelius
        switch(kuriKontruoliuosim) {
            case 'vardas':
                setVardas(e.target.value);
                break;
            case 'tipas':
                setTipas(e.target.value);
                break;
            case 'kaina':
                setKaina(e.target.value.replace(/,/g, '.'));//susirandam , ir ji paversim i .  nes kitaip nesupras rwactas
                break;
            case 'trukme':
                setTrukme(e.target.value.replace(/,/g, '.'));
                break;
            case 'nuotrauka':
                setNuotrauka(e.target.value);
                break;
            default:
        }
    }

    return(
        <div className="stulpeliu-vaikas2">
                    <div className="container1 ">
            <nav className="navbar">
                <a className="nav-linkk" href="/">Manikiūras Tau...</a>
                <div className="navbar-man ">
                    <Link className="nav-link" to="/">Visi</Link>  {/*//a.butinas linkams (<Link className="nav-link" to="/">Home</Link>)*/}
                    <Link className="nav-link" to="/klasikinis">Klasikinis</Link>{/*//a.butinas linkams /leaf nurodo kaip i ji patekti i http://localhost:3000/leaf*/}
                    <Link className="nav-link" to="/prancuziskas">Prancūziškas</Link>{/*a.<Link> ir isrusiuoja */}
                    <Link className="nav-link" to="/kombinuotas">Kombinuotas</Link>{/* a.<Link> ir isrusiuoja */}
                    <Link className="nav-link" to="/create">Create</Link>{/* a.<Link> ir isrusiuoja */}
                </div>   
            </nav>
        </div>
            <div className="titleee">
                <h2>Add New Manikiuras </h2>
            </div>
            <div className="sarasas">
                <div className="formos-vidus">
                    <div className="forma">
                        <label>Manikiuro meistre:</label>
                        <input type="text" className="form-control" placeholder="Manikiuro meistre" value={vardas} onChange={e => inputHandler(e, 'vardas')}/>
                    </div>
                    <div className="forma">
                        <label>Manikiūro rūšys:</label>
                        <select className="form-control" value={tipas}  onChange={e => inputHandler(e, 'tipas')} >
                            <option  value="1">Klasikinis manikiūras</option>
                            <option  value="2">Prancūziškas manikiūras</option>
                            <option  value="3">Kombinuotas manikiūras</option>
                         </select>
                    </div>
                    <div className="forma">
                        <label>Kaina:</label>
                        <input type="text" className="form-control" placeholder="Kaina eurais" value={kaina}  onChange={e => inputHandler(e, 'kaina')} />
                    </div>
                    <div className="forma">
                        <label>Trukme:</label>
                        <input type="text" className="form-control"placeholder="Trukme" value={trukme}  onChange={e => inputHandler(e, 'trukme')}/>
                    </div>
                    <div className="forma">
                        <label>Nuotrauka:</label>
                        <input  type="file" className="forma-foto" value={nuotrauka}  onChange={e => inputHandler(e, 'nuotrauka')}/>
                    </div>
                    <div className="forma-buttonss">
                        <button type="button" className="forma-buttons" onClick={buttonHandler}>Irasyti</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Create;
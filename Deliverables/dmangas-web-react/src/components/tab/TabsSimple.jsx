import './style.css';
import React from 'react';
function TabsSimple(props) {
    const items = props.itab;  
    const titulo = props.titulo;
    const key_position = props.key_position;  
    if(items.length>0){
        return(
            <div className='tabs'> 
             <div className="icard-header">
                <div className="icar-h4"><div className='mi-titulo'>{titulo}</div></div>
                <div id="open_inicio" className="icar-boton"><button type="button">Log in</button></div>
             </div> 
             <div className="scroll-cabecera">
              
            <div className='mi-scroll'>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
            {
               items.map((value, i) =>
                    <li key={key_position+'01'+i} className="nav-item">
                       <a className={`nav-link ${value.selected=== true ? 'active' : ''}`} id={'tab_'+value.href} data-toggle="tab" href={'#'+value.href} role="tab" aria-controls={value.href} aria-selected={value.selected}>{value.texto}</a>
                    </li>  
            )}                      
            </ul>  
            </div> 
            </div> 
            <div className="tab-content" id="myTabContent">
                  {
                    items.map((val,i) =>
                    <div  key={key_position+'02'+i} className={`tab-pane fade ${val.selected=== true ? 'show active' : ''}`} id={val.href} dangerouslySetInnerHTML={{__html: val.contenido}} role="tabpanel" aria-labelledby={'tab_'+val.href}>
                        
                    </div>
                  )}     
                               
             </div>
        </div>
        ); 
      } 
}
export default TabsSimple;
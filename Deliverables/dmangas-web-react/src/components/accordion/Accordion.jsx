import './style.css';
import React from 'react';

function Accordion(props) {
  const { AcordeonData, contenidoClass } = props;

  const aliasItem = AcordeonData[0].alias;

  return (
    <div className="accordion" id={"accordionExample" + aliasItem}>
      {AcordeonData.map((v, i) => (
        <div key={'acord-item' + i} className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapseOne" + v.alias}
              aria-expanded={v.open}
              aria-controls={"collapseOne" + v.alias}
              dangerouslySetInnerHTML={{ __html: v.titulo }}
            ></button>
          </h2>
          <div
            id={"collapseOne" + v.alias}
            className={"accordion-collapse collapse" + v.show}
            aria-labelledby="headingOne"
            data-bs-parent={"#accordionExample" + aliasItem}
          >
            <div className="accordion-body">
              <div
                className={contenidoClass}
                dangerouslySetInnerHTML={{ __html: v.contenido }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;

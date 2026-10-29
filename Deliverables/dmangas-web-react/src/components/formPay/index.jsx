import React from "react";
import DropdownForm from "../dropdownForm/DropdownForm";


export default function index() {
  const dropdownOptions = ["Option 1", "Option 2", "Option 3"];
  const handleOptionSelect = (option) => {
    console.log("Option selected:", option);
  };
  return (
    <div id="tab1" class="tabcontent" style={{ display: "block" }}>
      <div class="box ">
        <ul class="catalogo">
          <li class="ibillete">
            <span>Summary</span>
            <div className="group-date historia">
              <span>Date from:</span>
              {/* <img class="ifoto" src="img/icalendar.png" alt="" /> */}
              <input className="" type="date" />
            </div>
            <div className="group-date historia">
              <span>To:</span>
              {/* <img class="ifoto" src="img/icalendar.png" alt="" /> */}
              <input className="" type="date" />
            </div>

          </li>
          <li class="ibillete" style={{paddingBottom: 0}}>
            <span>Payment Method</span>
            <div className="group-date no-borde" style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
             <img src="img/paypal.png" style={{ marginRight: '10px' }} />
             <span >Pay with PayPal</span>
           </div>


          </li>
          <li class="ibillete" style={{paddingBottom: 0}}>
            <span>Email</span>
            <div class="group-date no-borde">
              <span>example@gmail.com</span>
            </div>
          </li>
          <li class="ibillete" style={{paddingBottom: 0}}>
            <span>Payment cycle start</span>
            <div class="group-date no-borde">
              <span>01-02-2022</span>
            </div>
          </li>

          <div className="ibillete">
            <span>Transaction History</span>

            <div className="group-date historia">
              <span>Payment Period</span>
              <input className="input-pago" type="text" />
            </div>
            <div className="group-date historia">
              <DropdownForm
                options={dropdownOptions}
                onSelect={handleOptionSelect}
                label={"Transaction ID"}
              />
            </div>
          </div>

          <div className="ibillete">
            <div className="group-date historia">
              <span>Payment Status</span>
              <input className="input-pago" type="text" />
            </div>
            <div className="group-date historia">
              <DropdownForm
                options={dropdownOptions}
                onSelect={handleOptionSelect}
                label={"Payment Date"}
              />
            </div>
          </div>

          <div className="ibillete">
            <div className="group-date historia">
              <span>Money raised</span>
              <input className="input-pago" type="text" />
            </div>
          </div>
          <div className="ibillete">
            <div className="group-date historia" style={{border: "none"}}>

            </div>
          </div>
        </ul>
      </div>

    </div>
  );
}

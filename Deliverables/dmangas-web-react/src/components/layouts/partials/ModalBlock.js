import Modal from "../../modal/Modal";

export default function ModalBlock(props) {
	const showModalInicio = props.showModalInicio
	const showModalPromo = props.showModalPromo
	console.log(showModalPromo)

	return(
		<>
			{
	            showModalInicio &&
	            !showModalPromo &&
	            <div className='home inicio-login'>
	                <Modal imodal={'inicio'} />
	            </div>
	        }
	        {
	            showModalPromo &&
	            <div className='promo-modal inicio-login'>
	                <Modal imodal={'promo'} />
	            </div>
	        }
	        <div className='buscar'>
	            <Modal imodal={'buscar'} />
	        </div>
	        <div className='registro'>
	            <Modal imodal={'registro'} />
	        </div>
	        <div className='unete'>
	            <Modal imodal={'unete'} />
	        </div>
	        <div className='quienes-modal hide_desk'>
	            <Modal imodal={'quienes-modal'} />
	        </div>
        </>
	);
}
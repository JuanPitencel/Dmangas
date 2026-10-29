export default function PageContent(props) {
	const customClass = props.customClass
	const htmlContent = props.content

	return (
		<div className={`container ${customClass}`} style={{marginTop: '30px'}}>
            <div className='texto-interna hide_movil'>
            	<div className="itexto">
            		<div className="item" dangerouslySetInnerHTML={{__html: htmlContent}}></div>
            	</div>
            </div>
            <div className='search-movil hide_desk'>
                <img alt="imag" className="icono_close_buscar" src="/img/mobile/close_search.png" />
                <input type="text" placeholder="Search mangas or novels" className="input-search" name="search" />
            </div>
        </div>
	);
};
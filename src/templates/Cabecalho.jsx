import { Alert } from "react-bootstrap";

export function Cabecalho(props){
    return(
        <div>
            <h3>
                <Alert variant='dark' className='text-center mb-0'>
                    {props.texto}
                </Alert>
            </h3>
        </div>
    )
}
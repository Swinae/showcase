import { useNavigate } from 'react-router-dom'
import './ButtonType1.css'

interface ButtonProps {
    ButtonText: string
    ButtonRedirection: string
}

export function ButtonType1(props: ButtonProps) {

    const { ButtonText, ButtonRedirection } = props
    const navigate = useNavigate()
    const redirection = () => {
        navigate(`${ButtonRedirection}`)
    }
    
    return (
        <button onClick={redirection}>{ButtonText}</button>
    )
}
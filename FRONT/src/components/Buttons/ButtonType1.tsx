import './ButtonType1.css'

interface ButtonProps {
    ButtonText: string
}

export function ButtonType1(props: ButtonProps) {

    const { ButtonText } = props
    
    return (
        <button>{ButtonText}</button>
    )
}
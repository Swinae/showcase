import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

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
        <button
            css={css`
                background-color: #2A9D8F;
                border: none;
                border-radius: 6px;
                color: white;
                padding: 0.3rem 1.5rem;
                font-family: inherit;`
                }
                
            onClick={redirection}>

            {ButtonText}
            
        </button>
    )
}
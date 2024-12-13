import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
    ButtonText: string
    ButtonRedirection?: string
}

export function ButtonType3(props: ButtonProps) {
    const { ButtonText, ButtonRedirection } = props
    const navigate = useNavigate()
    const redirection = () => {
        navigate(`${ButtonRedirection}`)
    }

    return (
        <button
            css={css`
                border: none;
                background-color: #ffffff;
                color: var(--main-bg-color);
                font-family: inherit;
                font-size: 32px;
                text-align: left;
                width: fit-content;`
            }

            onClick={redirection}>

            <i className="fa-solid fa-circle-plus"></i> {ButtonText}

        </button>
    )
}
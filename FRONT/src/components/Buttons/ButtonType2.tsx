import { css } from "@emotion/react"

interface ButtonProps {
    ButtonText: string
}

export function ButtonType2(props: ButtonProps) {
    const { ButtonText } = props

    const buttonStyle = css`
        padding: 0.75rem 0;
        color: white;
        font-size: 1rem;
        background-color: #E76F51;
        border: none;
        border-radius: 0.5rem;
    `

    return (
        <button type="submit" css={buttonStyle}>
            {ButtonText}
        </button>
    )
}
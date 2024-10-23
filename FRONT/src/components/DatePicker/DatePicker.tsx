import { css } from '@emotion/react';

interface DatePickerProps {
    dates: {
        start_date: Date | undefined,
        end_date: Date | undefined
    }
}

export function DatePicker(props: DatePickerProps) {
    const { dates } = props

    const formatDate = (date: Date | undefined) => {
        return date
            ? date.toLocaleDateString('en-gb', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
            : 'Date not available'; // Fallback text when date is undefined
    };

    const start_date = formatDate(dates.start_date)
    const end_date = formatDate(dates.end_date)


    /* ---STYLE--- */
    const datePickerStyle = css`
        padding: 1.5rem 0rem;
        box-shadow: 0px 0px 15px -2px rgba(155, 155, 155, 0.40);
        border-radius: 3rem;
        text-align: center;
        font-family: 'Oswalt', sans-serif;
        font-size: 20px;
        font-weight: 500;

        & input {
            border: none;
            font-family: 'Oswalt', sans-serif;
            font-size: 20px;
            font-weight: 500; 
        }
    `

    return (
        <div>
            <div className='date-picker' css={datePickerStyle}>
                <i className="fa-solid fa-calendar-days"></i> 
                <input className='date-picker-input' type="date" value={start_date}/> <i className="fa-solid fa-arrow-right"></i> <input className='date-picker-input' type="date" value={end_date}/>
            </div>
        </div>

    )
}
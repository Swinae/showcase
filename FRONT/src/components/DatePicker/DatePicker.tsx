import './DatePicker.css'

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

    return (
        <div>
            <div className='date-picker'>
                <i className="fa-solid fa-calendar-days"></i> 
                <input className='date-picker-input' type="date" value={start_date}/> <i className="fa-solid fa-arrow-right"></i> <input className='date-picker-input' type="date" value={end_date}/>
            </div>
        </div>

    )
}
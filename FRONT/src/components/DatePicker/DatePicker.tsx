import { css } from '@emotion/react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { useState } from 'react';

interface DatePickerProps {
    newTripDates: (data: any) => void;
}

interface DateRange {
    startDate: Date | undefined;
    endDate: Date | undefined;
    key: string | undefined;
}

export function DatePicker(props: DatePickerProps) {

    const { newTripDates } = props
    /* ---STYLE--- */
    const datePickerStyle = css`
        .rdrDateRangePickerWrapper {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .rdrCalendarWrapper.rdrDateRangeWrapper{
            flex: 1;
        }

        .rdrMonth {
            width: 100%;
        }
        
        .rdrDefinedRangesWrapper {
            display: none
        }
    `

    const [dateRange, setDateRange] = useState<DateRange[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const handleSelect = (item: RangeKeyDict) => {
        setDateRange([
            {
                startDate: item.selection.startDate,
                endDate: item.selection.endDate,
                key: 'selection'
            }
        ])
    }

    return (
        <>
            <DateRangePicker
                css={datePickerStyle}
                ranges={dateRange}
                onChange={ (item) => {
                    handleSelect(item)
                    newTripDates(item)             
                }}
                months={1}
                direction="vertical"
                showDateDisplay={false}
                rangeColors={['var(--third-font-color)']}
                moveRangeOnFirstSelection={false}
            />
        </>
        /*      <div>
                 <div className='date-picker' css={datePickerStyle}>
                     <i className="fa-solid fa-calendar-days"></i> 
                     <input className='date-picker-input' type="date" value={start_date}/> <i className="fa-solid fa-arrow-right"></i> <input className='date-picker-input' type="date" value={end_date}/>
                 </div>
             </div> */
    )
}
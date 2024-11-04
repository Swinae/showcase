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
    )
}
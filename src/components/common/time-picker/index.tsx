import styled from '@emotion/styled'
import { endOfDay, format } from 'date-fns'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface ITimePickerProps {
  value: Date
  onChange: (date: Date) => void
}

const TimePicker = ({ value, onChange }: ITimePickerProps) => {
  return (
    <Container>
      <DatePicker
        selected={value}
        onChange={onChange}
        showPopperArrow={false}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        minTime={new Date()}
        maxTime={endOfDay(new Date())}
        customInput={
          <InputButton type="button">
            <InputIcon className="material-icons md-20">schedule</InputIcon>
            {format(value, 'h:mm aa')}
            <InputIcon className="material-icons md-20">
              keyboard_arrow_down
            </InputIcon>
          </InputButton>
        }
      />
    </Container>
  )
}

const Container = styled.div`
  .react-datepicker {
    border: none;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  }
  .react-datepicker-popper {
    padding-top: 0 !important;
  }
  .react-datepicker__header {
    background-color: #3909c240; // TODO: theme
    border: none;
  }
  .react-datepicker__time-container {
    width: 10rem;
  }
  .react-datepicker-time__header {
    color: #ffffff;
  }
  .react-datepicker__time-box {
    width: 10rem !important;
  }
  .react-datepicker__time-list-item--selected {
    background-color: #3909c290 !important; // TODO: theme
  }
`
const InputButton = styled.button`
  height: 2.5rem;
  border: 1px solid #dbdbdb; // TODO: theme
  width: 10rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`
const InputIcon = styled.span`
  color: #dbdbdb; // TODO: theme
`

export default TimePicker

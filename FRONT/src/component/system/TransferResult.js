import React, {useState, useRef} from 'react'
import DatePicker from 'react-datepicker';
import * as dateFns from "date-fns";
import { Field, FieldArray, reduxForm } from 'redux-form'


const required = value => true 
? undefined 
: 'Required'

const renderField = ({ 
  input, 
  label, 
  type, 
  initvalue, 
  refFo, 
  meta: { touched, error } 
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} value={initvalue} ref={refFo}/>
      {touched && error && alert("선택해주세요")}
    </div>
  </div>
)

const renderMembers = ({ 
  fields, 
  dateRef, 
  dateArray, 
  updateDate, 
  inputRef_1, 
  meta: { error, submitFailed } 
}) => {
  return (
  <div>    
      <button 
      type="button" 
      onClick={()=>{fields.length < 3
      ?fields.push({})
      :alert("최대 3개"); 
      setTimeout(()=>{inputRef_1.current.focus()},100);}}
      >
        이체결과 조회 정보
      </button>
      {submitFailed && error && <span>{error}</span>}
    {fields.map((member, index) => (
      <div key={index}>
        <h4>이체결과 조회 #{index + 1}</h4>
        <Field
          name={`${member}.tran_no`}
          type="text"
          component={renderField}
          label="First Name"
          initvalue={index+1}
          refFo={inputRef_1}
        />
        <Field
          name={`${member}.org_tran_amt`}
          type="text"
          component={renderField}
          label="Last Name"
        />
        <Field
          name={`${member}.org_bank_tran_date`}
          id={index}
          component={date}
          dateRef={dateRef[index]}
          updateDate={updateDate}
          dateArray={dateArray}
        />  
      </div>
    ))}
  </div>
  )
}

const date = ({
  input,
  dateRef,
  updateDate,
  dateArray,
  id
}) => (
  <>
    <DatePicker 
    selected={dateArray[id].date}
    dateFormat="yyyy-MM-dd"
    onChange={(date)=>{dateRef.current.focus(); updateDate(id, date)}}
    placeholderText="일자"
    />
    <input 
    {...input} 
    className="date-hidden"
    value={dateArray[id].date===null?'':dateFns.format(dateArray[id].date, 'yyyyMMdd')} 
    ref={dateRef}
  />
  </>
)

const FieldArraysForm = props => {

  const inputRef_1 = useRef(null);
  const dateRef = new Array(useRef(),useRef(),useRef());

  const { handleSubmit, pristine, reset, submitting, updateDate, dateArray } = props
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray 
      name="req_list" 
      component={renderMembers} 
      inputRef_1={inputRef_1} 
      dateRef={dateRef}
      updateDate={updateDate}
      dateArray={dateArray}
      validate={required}
      />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldArrays'
})(FieldArraysForm)
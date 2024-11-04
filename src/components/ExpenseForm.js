import React from 'react'
import './ExpenseForm.css'
import { MdSend } from 'react-icons/md'

const ExpenseForm = ({ hadnleCharge, charge, hadnleAmount, amount, handleSubmit, edit }) =>{
    return (
        <form>
            <div className='form-center'>
                <div className='form-group'>
                    <label htmlFor='charge'>지출 항목</label>
                    <input 
                        type='text' 
                        className='form-control' 
                        id='charge' 
                        name='charge' 
                        value={charge}
                        placeholder='예) 렌트비' 
                        onChange={hadnleCharge}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='amount'>비용</label>
                    <input 
                        type='number' 
                        className='form-control' 
                        id='amount' 
                        name='amount' 
                        value={amount}
                        placeholder='예) 100원' 
                        onChange={hadnleAmount}
                    />
                </div>
            </div>
            <button 
                type='submit' 
                className='btn' 
                onClick={handleSubmit}
            >
                {edit? "수정" : "제출"}
                <MdSend className='btn-icon' />
            </button>
        </form>
    )
}

export default ExpenseForm
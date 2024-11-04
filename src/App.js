import { Component, useState } from "react";
import "./App.css"
import ExpenseForm from "./components/ExpenseForm.js"
import ExpenseList from "./components/ExpenseList.js"
import Alert from "./components/Alert.js";

const App = () => {

  const [charge, setCharge] = useState("");
  const [id, setId] = useState('');
  const [edit, setEdit] = useState(false);
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState({show: false}); 

  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 1600 },
    { id: 2, charge: "교통비", amount: 400 },
    { id: 3, charge: "식비", amount: 900 },
  ])

  const hadnleCharge = (e) => {
    console.log(e.target.value);
    setCharge(e.target.value)
  }

  const hadnleAmount = (e) => {
    console.log(typeof e.target.valueAsNumber);
    setAmount(e.target.valueAsNumber)
  }

  const handleDelete = (id) =>{
    const newExpenses = expenses.filter(expense => expense.id !== id)
    console.log(newExpenses)
    setExpenses(newExpenses)

    handleAlert({
      type: 'danger',
      text: '아이템이 삭제되었습니다.'
    })
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type: type, text: text });
    setTimeout(() => {
      setAlert({ show: false })
    }, 7000)
  }

  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }

  const clearItems = () => {
    setExpenses([]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(charge !== '' && amount > 0){
      if(edit){
        const newExpense = expenses.map(item => {
          return item.id === id ? {...item, charge: charge, amount: amount} : item;
        })

        setExpenses(newExpense);
        setEdit(false);
        handleAlert({
          type: 'success',
          text: '아이템이 수정되었습니다.'
        })
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount };

        //불변성을 지켜주기 위해 새로운 expenses를 생성
        const newExpenses = [ ...expenses, newExpense];
        setExpenses(newExpenses)
        setCharge('')
        setAmount(0)

        handleAlert({
          type: 'success', 
          text: '아이템이 생성되었습니다.' 
        });
      }
      
    }else{
      console.log('error')

      handleAlert({
        type: 'danger', 
        text: 'charge는 빈 값일 수 없으며, amount는 0보다 커야 합니다.'
      })
    }
  }

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>

      <div style={{width:'100%', backgroundColor:'white', padding:'1rem'}}>
        <ExpenseForm 
          charge={charge}
          hadnleCharge={hadnleCharge}
          amount={amount}
          hadnleAmount={hadnleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>
      <div style={{width:'100%', backgroundColor:'white', padding:'1rem'}}>
        <ExpenseList 
          expenses={expenses} 
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>

      <div style={{display: 'flex', justifyContent:'end', marginTop:'1rem'}}>
        <p style={{fontSize:'2rem'}}>
          총 지출 :
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount)
            }, 0)
            
            }원</span>
        </p>
      </div>
    </main>
  )
}

export default App;
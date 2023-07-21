import React, { useEffect, useState, useRef } from 'react'
import DynamicForm from './components/DynamicForm'

const App = () => {

  const [stepInfo, setStepInfo] = useState({
    step: 1,
    data: "",
  })

  const [emptyError, setEmptyError] = useState("")

  const inputRef = useRef();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("stepInfo"))) {
      var existingData = JSON.parse(localStorage.getItem('stepInfo')) || [];
      setStepInfo({
        step: existingData[existingData.length - 1].step,
        data: existingData[stepInfo.step + 1]?.data
      })
    }
    else {
      localStorage.setItem("stepInfo", JSON.stringify([{ step: 1, data: "" }]))
    }
  }, [stepInfo.step])

  const handleDataChange = () => {
    setStepInfo(prevState => ({
      ...prevState,
      data: inputRef.current.value
    }))
    const existingData = JSON.parse(localStorage.getItem('stepInfo')) || [];
    const stepIndex = existingData.findIndex((item) => item.step === stepInfo.step);
    if (stepIndex !== -1) {
      existingData[stepIndex].data = inputRef.current.value;
    } else {
      existingData.push({
        step: stepInfo.step,
        data: inputRef.current.value,
      });
    }
    localStorage.setItem('stepInfo', JSON.stringify(existingData));
  }

  const handleStepForward = () => {

    if (inputRef.current.value) {
      if (stepInfo.step !== 3)
        setStepInfo({
          step: (stepInfo.step + 1)
        })

      const existingData = JSON.parse(localStorage.getItem('stepInfo')) || [];
      const stepIndex = existingData.findIndex((item) => item.step === stepInfo.step + 1);
      console.log(stepIndex)
      if (stepIndex === -1 && stepInfo.step !== 3) {
        existingData.push({
          step: stepInfo.step + 1,
          data: "",
        });
        localStorage.setItem('stepInfo', JSON.stringify(existingData));
      }
      else if (stepIndex !== -1) {
        if (existingData.length) {
          setStepInfo(prevState => ({
            ...prevState,
            data: existingData[stepIndex].data
          }))
        }
      }
      setEmptyError("")
    } else {
      setEmptyError("Please Fill the Field!")
    }

    if (stepInfo.step === 3) {
      const jsonDataFromLocalStorage = localStorage.getItem('stepInfo');
      if (jsonDataFromLocalStorage) {
        const jsonData = JSON.parse(jsonDataFromLocalStorage);
        const salaryIndex = jsonData.findIndex((item) => item.step === 2)
        const salary = jsonData[salaryIndex].data
        console.log(salary);
        console.log(salary > 25000);
        jsonData.push(salary > 25000 ? { step: 4, data: "Eligible" } : { step: 4, data: "Ineligible" })
        fetch('http://localhost:5000/saveData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Data saved on the server:', data);
            setStepInfo({
              step: 1,
              data: ""
            })
            if (salary > 25000) {
              setEmptyError("Thank you! You are Eligible!")
            } else {
              setEmptyError("Sorry! You are Ineligible!")
            }
            localStorage.removeItem("stepInfo");
          })
          .catch((error) => {
            console.error('Error saving data on the server:', error);
          });
      }
    }

  }

  const handleStepBackward = () => {
    var existingData = JSON.parse(localStorage.getItem('stepInfo')) || [];
    setStepInfo({
      step: stepInfo.step - 1,
      data: existingData[stepInfo.step - 2].data
    })
    setEmptyError("")
  }

  return (
    <>
      {stepInfo.step === 1 && <DynamicForm showLabel="Name" placeHolder="Name" inputType="text" inputStep="" stepInfo={stepInfo} setStepInfo={setStepInfo} prevButton="Previous" nextButton="Next" handleDataChange={handleDataChange} handleStepForward={handleStepForward} handleStepBackward={handleStepBackward} inputRef={inputRef} emptyError={emptyError} />}
      {stepInfo.step === 2 && <DynamicForm showLabel="Salary" placeHolder="Salary" inputType="number" inputStep="1000" stepInfo={stepInfo} setStepInfo={setStepInfo} prevButton="Previous" nextButton="Next" handleDataChange={handleDataChange} handleStepForward={handleStepForward} handleStepBackward={handleStepBackward} inputRef={inputRef} emptyError={emptyError} />}
      {stepInfo.step === 3 && <DynamicForm showLabel="Loan Amount" placeHolder="Loan Amount" inputType="number" inputStep="500" stepInfo={stepInfo} setStepInfo={setStepInfo} prevButton="Previous" nextButton="Submit" handleDataChange={handleDataChange} handleStepForward={handleStepForward} handleStepBackward={handleStepBackward} inputRef={inputRef} emptyError={emptyError} />}
    </>
  )
}

export default App

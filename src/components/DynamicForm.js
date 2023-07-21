import React from 'react'
import { styled } from 'styled-components'


const DynamicForm = ({ showLabel, placeHolder, inputType, inputStep, stepInfo, nextButton, handleDataChange, handleStepForward, inputRef, prevButton, handleStepBackward, emptyError }) => {

    const Wrapper = styled.section`
        h1{
            color:#0b0af5;
            text-align:center;
            background-color:#0572FA;
            margin-top:0;
            padding:1%;
        }
        div{
            display:grid;
            place-items:center;
            margin-top: 2%;
            padding:3%;
            div{
                width:50%;
                background-color:#0b0af5;
                border:2px solid black;
                box-shadow:2px 2px 5px 5px grey;
                border-radius:2%;
                div{
                    border:none;
                    box-shadow:none;
                    display:flex;
                    flex-direction:row;
                    justify-content:space-around;
                    button{
                        width:100px;
                        padding:2%;
                        background-color:#fff;
                        box-shadow:2px 2px 2px 2px grey;
                        border-radius:10%;
                        cursor:pointer;
                    }
                }
                input{
                    padding:3%;
                    font-size:20px;
                    background-color:black;
                    color:white;
                    text-align:center;
                }
            }
        }
        h3{
            color:red;
            text-align:center;
        }

        @media screen and (max-width:600px){
            div{
                div{
                    margin-top:30%;
                    width:100%;
                }
            }
        }
    `

    const { step, data } = stepInfo;

    return (
        <Wrapper>
            <h1>Get Your Loan</h1>
            <div>
                <div>
                    <h2>Enter Your {showLabel}</h2>
                    <input type={inputType} step={inputStep} min="0" placeholder={`Enter Your ${placeHolder}...`} value={data} ref={inputRef} onChange={handleDataChange} autoFocus />
                    <div>
                        <button onClick={() => handleStepBackward()} style={step === 1 ? { visibility: "hidden" } : { visibility: "visible" }}>{prevButton}</button>
                        <button onClick={() => handleStepForward()}>{nextButton}</button>
                    </div>
                </div>
            </div>
            <h3>{emptyError}</h3>
        </Wrapper>
    )
}

export default DynamicForm

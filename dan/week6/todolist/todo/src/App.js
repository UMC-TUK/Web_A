import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { increaseCount, addproduct, deleteproduct, checkproduct } from "./store/todoStore.js";
import axios from 'axios';
//dasda
function App() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [contentsname, setcontentsname] = useState('');
  let [contentsp, setcontentsp] = useState('');

  function check(e, i) {
    if (e.target.checked) {
      dispatch(checkproduct(i));
    } else {
      dispatch(checkproduct(i));
    }
  }
  //자동렌더링
  const getweather = async () => {
    await axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst', {
      params: {
        serviceKey: 'ooi+36tQ9VaudYeSWymYHZ7VETMmsZN9kZd/J2LPuqPJSm/dQ/Akv+LwffaudB8wnf415gT3zKl1cfaM4eOB1w==',
        pageNo: '1',
        numOfRows: '20',
        dataType: 'JSON',
        base_date: '20230524',
        base_time: '0500',
        nx: '60',
        ny: '125'

      }
    }).then(
      (response) => {
        console.log(response.data)
      }
    ).catch(function (error) {
      console.log(error)
    });
  }
  useEffect(() => {
    getweather();
  }, [])
  return (
    <>
      {
        state.contents.map(function (a, i) {
          console.log(state.contents[i].id);
          return (
            <div className='list'>
              <h4 style={{ cursor: "pointer" }} onClick={() => {
                setTitle(i);
                setModal(true);
              }} className={(state.contents[i].completed) ? "completed" : ""}>{state.contents[i].name}
                <span style={{ cursor: "pointer" }}
                ><input type='checkbox' onClick={e => check(e, i)} /> </span></h4>
              <button onClick={() => {
                if (title === state.contents.length - 1) {
                  if (i == 0) {
                    setModal(false);
                  } else {
                    setTitle(i - 1);
                  }
                }

                dispatch(deleteproduct(state.contents[i].id));


              }

              }>삭제</button>
            </div >
          )
        }
        )
      }


      {
        modal == true ? <Modal index={title} contents={state.contents} dispatch={dispatch} /> : null
      }
      <br />
      할 일: <input type="text" onChange={(e) => { setcontentsname(e.target.value) }} /><br />
      <span style={{ verticalAlign: 'top' }}>상세내용:</span> <textarea onChange={(e) => { setcontentsp(e.target.value) }} /><br />
      <button style={{ textAlign: "center" }} onClick={() => {
        dispatch(addproduct(
          { id: state.contents.length + 1, name: contentsname, p: contentsp, 날짜: Date(), completed: false }))
      }}>add</button>
    </>
  )
}

//스터디 범위까지완료!
function Modal(props) {
  return (
    <div className={(props.contents[props.index].completed) ? "modal completed" : "modal"} >
      <h4>{props.contents[props.index].name}</h4>
      <p>{props.contents[props.index].날짜}</p>
      <p>{props.contents[props.index].p}</p>

    </ div >
  )
}
export default App;


import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';

import deleteImg from './img/delete.png';
import plusImg from './img/plus.png';
import firework from './img/firework.gif';

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
    background: #000000;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;

  width: 30rem;
  height: 52rem;
  border-radius: 20px;
  background: #000000;
  border: 1px solid white;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  overflow: auto;

  width: 25rem;
  height: 17rem;
  border-radius: 20px;
  background: #000000;
  border: 1px solid white;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: white;
  }
  &::-webkit-scrollbar-track {
    background-color: black;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  line-height: 2rem;
`;

const Title = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: white;
  text-align: left;
  font-size: 2rem;
  font-weight: bold;
`;

const TodoForm = styled.div`
  flex-direction: row;
  margin-bottom: 1rem;
`;

const TodoInput = styled.input`
  width: 15rem;
  height: 1.5rem;
  border-radius: 20px;
`;

const EnterButton = styled.img`
  margin-left: 0.5rem;
  height: 2rem;
  width: 2rem;
  margin-bottom: -0.8rem;
  // background-image: url('./img/plus.png');
`;

const DeleteButton = styled.img`
  line-height: 0rem;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  height: 1rem;
  width: 1rem;
`;

const TodoText = styled.button`
  line-height: 0rem;
  margin-left: 1rem;
  padding: 1rem;
  font-size: 1rem;
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0);
  border: none;
`;

const Celebrate = styled.img`
  display: none;
  position: absolute;
  height: 30rem;
  width: 30rem;
`;

function App() {
  const [cnt, setCnt] = useState(1);
  // input 값
  const [text, setText] = useState('');
  // DoingList에 넣을 값
  const [doingList, setDoingList] = useState([]);
  // DoneList에 넣을 값
  const [doneList, setDoneList] = useState([]);

  const onChange = (e) => {
    setText(e.target.value);
    // setTextList([...textList, e.target.value]);
  };

  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      onReset();
    }
  };

  const onReset = () => {
    const todo = {
      id: Date.now(),
      text: text,
    };
    setDoingList(doingList.concat(todo));
    // setCnt(cnt + 1);
    setText('');
  };

  // listname에서 다른 리스트로 요소 이동
  const moveList = (listname, id, text) => {
    if (listname == doingList) {
      plusList(doneList, id, text);
      removeList(doingList, id);
    } else if (listname == doneList) {
      plusList(doingList, id, text);
      removeList(doneList, id);
    }
  };

  const plusList = (listname, inputId, inputText) => {
    const todo = {
      id: inputId,
      text: inputText,
    };

    console.log(todo);

    if (listname == doingList) {
      setDoingList(doingList.concat(todo));
    } else if (listname == doneList) {
      setDoneList(doneList.concat(todo));
      console.log(doneList);
    }
  };

  const removeList = (listname, id) => {
    if (listname == doingList) {
      setDoingList(doingList.filter((list) => list.id !== id));
    } else if (listname == doneList) {
      const newDoneList = doneList.filter((list) => list.id !== id);
      setDoneList(newDoneList);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Celebrate src={firework} />
        <Title> To-Do</Title>
        <TodoForm>
          <TodoInput onKeyPress={onKeyPress} onChange={onChange} value={text} />
          <EnterButton onClick={onReset} onChange={onChange} src={plusImg} />
        </TodoForm>

        <Title> Doing ( {doingList.length} )</Title>

        <SubContainer>
          {doingList.map((list) => (
            <RowContainer>
              <TodoText onClick={() => moveList(doingList, list.id, list.text)}>
                {list.text}
              </TodoText>
              <DeleteButton
                onClick={() => {
                  removeList(doingList, list.id);
                }}
                src={deleteImg}
              />
            </RowContainer>
          ))}
        </SubContainer>

        <Title> Done ( {doneList.length} )</Title>

        <SubContainer>
          {doneList.map((list) => (
            <RowContainer>
              <TodoText onClick={() => moveList(doneList, list.id, list.text)}>
                {list.text}
              </TodoText>
              <DeleteButton
                onClick={() => {
                  removeList(doneList, list.id);
                }}
                src={deleteImg}
              />
            </RowContainer>
          ))}
        </SubContainer>
      </Container>
    </>
  );
}

export default App;

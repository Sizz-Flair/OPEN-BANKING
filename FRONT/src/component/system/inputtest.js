import React, { useState } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    firstname: '',
    nickname: ''
  });

  const { firstname, nickname } = inputs; // 비구조화 할당을 통해 값 추출
  console.log("비구조화 할당을 통해 값 추출=======");
  console.log(inputs);
  console.log(firstname);
  console.log(nickname);

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      firstname: '',
      nickname: '',
    })
  };


  return (
    <div>
      <input name="firstname" placeholder="이름" onChange={onChange} value={firstname} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {firstname} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
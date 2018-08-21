import * as React from 'react';
import styled from '../../styled-components';

interface IQuestionEditor {
  question: string;
  contents: string;
  onEdit: (type: string, data: string) => void;
  onSubmit: () => void;
}

const handleQuestion = (onEdit) => (e) => {
  onEdit('question', e.target.value);
};

const handleContents = (onEdit) => (e) => {
  onEdit('contents', e.target.value);
}

const handleSubmit = (onSubmit) => () => {
  onSubmit();
}

const QuestionEditor: React.SFC<IQuestionEditor> = ({
  question,
  contents,
  onEdit,
  onSubmit,
}) => {
  return (
    <Wrapper>
      <Guide>질문 작성하기</Guide>
      <Inputs>
        <div>질문</div>
        <input
          value={question}
          onChange={handleQuestion(onEdit)}
        />
        <div>설명</div>
        <textarea
          value={contents}
          onChange={handleContents(onEdit)}
        />
      </Inputs>
      <Submit
        onClick={handleSubmit(onSubmit)}
      >작성하기</Submit>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #fff;
  padding: 4rem 3rem;
`;

const Guide = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 3rem;
`;

const Inputs = styled.div`
  div {
    color: #333;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 1rem;
  }

  input {
    height: 3.5rem;
    width: 100%;
    border: 1px solid #eee;
    border-radius: 3px;
    font-size: 1.4rem;
    color: #333;
    margin-bottom: 2rem;
  }

  textarea {
    height: 12rem;
    width: 100%;
    border: 1px solid #eee;
    border-radius: 3px;
    font-size: 1.4rem;
    color: #333;
    margin-bottom: 2rem;
    resize: none;
  }
`;

const Submit = styled.button`
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  background-color: #333;
  border-radius: 3px;
  border: 0px;
  height: 4rem;
  width: 100%;
  line-height: 1;
  cursor: pointer;
`;

export default QuestionEditor;
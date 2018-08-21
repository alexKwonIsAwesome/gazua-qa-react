import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from '../../styled-components';

interface IQuestion {
  id: string;
  question: string;
  username: string;
  date: Date;
  contents: string;
  answerLength?: number;
  unclickable?: boolean;
};

const QuestionPanel: React.SFC<IQuestion> = ({ id, question, username, date, contents, answerLength, unclickable }) => {
  const Children = () => {
    return (
      <>
        <Question>Q: {question}</Question>
        <User>{username}</User>
        <Date>{date.toLocaleString()}</Date>
        <Contents>{contents}</Contents>
        {answerLength !== undefined ? (
          <Reply>답변 {answerLength}개</Reply>
        ) : null}
      </>
    );
  }
  return (
    <Wrapper>
      {
        unclickable ?
        <Container><Children /></Container> :
        <StyledLink to={`/question/${id}`}><Children /></StyledLink>
      }
    </Wrapper>
  )
};

const Wrapper = styled.div`
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #fff;
  line-height: 1;
  user-select: none;
  margin-bottom: 1.6rem;
`;

const Container = styled.div`
  padding: 4rem 3rem;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 4rem 3rem;
  text-decoration: none;
`;

const Question = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1.5rem;
`;

const User = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin-bottom: .5rem;
`;

const Date = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #999;
`;

const Contents = styled.div`
  font-size: 1.4rem;
  color: #555;
  margin-bottom: 3rem;
  line-height: 1.5;
`;

const Reply = styled.div`
  font-size: 1.3rem;
  color: #555;
`;

export default QuestionPanel;
import * as React from 'react';
import styled from '../../styled-components';

interface IAnswersPanel {
  answers?: Array<{
    id: string;
    username: string;
    date: Date;
    contents: string;
  }>
  answerLength: number;
};

class AnswersPanel extends React.Component<IAnswersPanel> {
  public render() {
    const { answers, answerLength } = this.props;

    if (answers && answers.length !==0) {
      return (
        <Wrapper>
          <Guide>{answerLength}개의 답변</Guide>
          {answers.map((item) => {
            const { id, username, date, contents } = item;
            return (
              <Comment key={id}>
                <Top>
                  <UserName>{username}</UserName>
                  <Date>{date.toLocaleString()}</Date>
                </Top>
                <Content>
                  {contents}
                </Content>
              </Comment>
            );
          })}
        </Wrapper>
      )
    }

    return null;
  }
}

const Wrapper = styled.div`
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #fff;
  padding: 4rem 3rem;
`;

const Guide = styled.span`
  display: inline-block;
  font-size: 1.8rem;
  font-weight: 800;
  color: #333;
  line-height: 1;
  margin-bottom: 3rem;
`;

const Comment = styled.div`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Top = styled.div`
  margin-bottom: 1rem;
`;
const UserName = styled.span`
  display: inline-block;
  line-height: 1;
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin-right: 1rem;
`;
const Date = styled.span`
  display: inline-block;
  line-height: 1;
  font-size: 1.2rem;
  font-weight: 400;
  color: #999;
`;
const Content = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: #333;
`;

export default AnswersPanel;
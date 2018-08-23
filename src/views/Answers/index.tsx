import * as React from 'react';
import styled from '../../styled-components';
import { Row, Col } from 'antd';

import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import QuestionPanel from '../../components/QuestionPanel';

class Answers extends React.Component {
  public renderQuestions() {
    const questions = [
      {
        id: '1',
        question: '오늘은 어떤 하루?',
        username: '가즈아',
        date: '11123412341',
        contents: '비트코인 다시 상승하는 모습 보여주네요 ㅋㅋ 다양한 정보 많이 찾아보시면서 실시간 대응하셔도 좋을듯 제가 공부해보니까 알트는 함부로 가지고 있는다고 답은 아니더라고요',
        answersLength: 0
      },
      {
        id: '2',
        question: '오늘은 어떤 하루?',
        username: '가즈아',
        date: '11123412341',
        contents: '비트코인 다시 상승하는 모습 보여주네요 ㅋㅋ 다양한 정보 많이 찾아보시면서 실시간 대응하셔도 좋을듯 제가 공부해보니까 알트는 함부로 가지고 있는다고 답은 아니더라고요',
        answersLength: 0
      },
      {
        id: '3',
        question: '오늘은 어떤 하루?',
        username: '가즈아',
        date: '11123412341',
        contents: '비트코인 다시 상승하는 모습 보여주네요 ㅋㅋ 다양한 정보 많이 찾아보시면서 실시간 대응하셔도 좋을듯 제가 공부해보니까 알트는 함부로 가지고 있는다고 답은 아니더라고요',
        answersLength: 0
      }
    ];
    return (
      <>
        {questions.map((item) => {
          const { id, question, username, date, contents, answersLength } = item;
          return (
            <QuestionPanel
              key={id}
              id={id}
              question={question}
              username={username}
              date={date}
              contents={contents}
              answersLength={answersLength}
            />
          );
        })}
      </>
    )
  }
  public render() {
    return (
      <Wrapper>
        <Navbar />
        <Container>
          <Row gutter={16}>
            <Col span={16}>
              {this.renderQuestions()}
            </Col>
            <Col span={8} />
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

export default Answers;
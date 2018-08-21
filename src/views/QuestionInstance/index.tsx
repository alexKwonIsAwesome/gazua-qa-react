import * as React from 'react';
import styled from '../../styled-components';
import { Row, Col } from 'antd';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import QuestionPanel from '../../components/QuestionPanel';
import AnswersPanel from '../../components/AnswersPanel';
import AnswerEditor from '../../components/AnswerEditor';

import {
  GET_QUESTION,
  GET_ANSWERS
} from './queries';

class QuestionInstance extends React.Component<RouteComponentProps<any>> {
  public renderQuestion() {
    const questionId = this.props.match.params.id;
    return (
      <Query query={GET_QUESTION} variables={{ id: questionId }}>
        {
          ({ error, loading, data }) => {
            if (error) { return null };
            if (loading) { return null };
            const { id, question, contents } = data.question;
            return (
              <QuestionPanel
                id={"1"}
                question={question}
                username="가즈아"
                date={new Date()}
                contents={contents}
                unclickable={true}
              />
            );
          }
        }
      </Query>
    )
  }

  public renderAnswers() {
    const questionId = this.props.match.params.id;
    return (
      <Query query={GET_ANSWERS} variables={{ id: questionId }}>
        {
          ({ error, loading, data }) => {
            if (error) { return null };
            if (loading) { return null };
            const { answers, answerLength } = data.question;
            return (
              <AnswersPanel
                answerLength={answerLength}
                answers={answers.map(({ id, contents }) => {
                  return {
                    id,
                    contents,
                    username: '가즈아',
                    date: new Date(),
                  }
                })}
              />
            );
          }
        }
      </Query>
    );
  }
  public render() {
    return (
      <Wrapper>
        <Navbar />
        <Container>
          <Row gutter={16}>
            <Col span={16}>
              {this.renderQuestion()}
              {this.renderAnswers()}
            </Col>
            <Col span={8}>
              <AnswerEditor />
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

export default QuestionInstance;
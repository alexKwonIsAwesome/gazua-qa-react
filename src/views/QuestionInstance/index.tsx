import * as React from 'react';
import styled from '../../styled-components';
import { Row, Col } from 'antd';
import { Query, Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import QuestionPanel from '../../components/QuestionPanel';
import AnswersPanel from '../../components/AnswersPanel';
import AnswerEditor from '../../components/AnswerEditor';

import {
  GET_QUESTION,
  GET_ANSWERS,
  ADD_ANSWER,
} from './queries';
import { GET_QUESTIONS as GET_QUESTION_BY_QUESTIONS } from '../Questions/queries';
import { GET_QUESTIONS as GET_QUESTION_BY_ANSWERS } from '../Answers/queries';

interface IState {
  contents: string;
}

class QuestionInstance extends React.Component<RouteComponentProps<any>, IState> {
  constructor(props) {
    super(props);
    this.state = {
      contents: ''
    }
  }

  public handleAnswerEdit = (e) => {
    e.preventDefault();
    this.setState({
      contents: e.target.value
    });
  }

  public handleAnserSubmit = (mutate, variables) => () => {
    const confirm = window.confirm('정말로 답변을 작성하시겠습니까?');
    if (confirm) {
      mutate({ variables });
    }
  }

  public handleMutationCompleted = () => {
    alert('답변이 성공적으로 등록되었습니다.');
    this.setState({ contents: '' });
  }

  public handleMutationRefetchQueries = () => [
    {
      query: GET_QUESTION_BY_QUESTIONS,
      variables: { offset: 0, limit: 10 }
    },
    {
      query: GET_QUESTION_BY_ANSWERS,
      variables: { offset: 0, limit: 10, answers: 'none' }
    }
  ]

  public renderQuestion() {
    const questionId = this.props.match.params.id;
    return (
      <Query query={GET_QUESTION} variables={{ id: questionId }}>
        {
          ({ error, loading, data }) => {
            if (error) { return null };
            if (loading) { return null };
            const { id, question, contents, updatedAt } = data.question;
            return (
              <QuestionPanel
                id={"1"}
                question={question}
                username="가즈아"
                date={updatedAt}
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
            const { answers, answersLength } = data.question;
            return (
              <AnswersPanel
                answersLength={answersLength}
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

  public renderAnswerEditor() {
    const questionId = this.props.match.params.id;
    const { contents } = this.state;
    return (
      <Mutation
        mutation={ADD_ANSWER}
        onCompleted={this.handleMutationCompleted}
        refetchQueries={this.handleMutationRefetchQueries}
      >
        {(mutate) => {
          return (
            <AnswerEditor
              contents={contents}
              onEdit={this.handleAnswerEdit}
              onSubmit={this.handleAnserSubmit(mutate, { questionId, contents })}
            />
          )
        }}
      </Mutation>
    )
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
              {this.renderAnswerEditor()}
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

export default QuestionInstance;
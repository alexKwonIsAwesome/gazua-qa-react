import * as React from 'react';
import styled from '../../styled-components';
import { Row, Col } from 'antd';
import { Query, Mutation } from 'react-apollo';

import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import QuestionPanel from '../../components/QuestionPanel';
import QuestionEditor from '../../components/QuestionEditor';

import {
  GET_QUESTIONS,
  ADD_QUESTION,
} from './queries';

interface IState {
  question: string;
  contents: string;
}

class Questions extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      contents: '',
    }
  }

  public handleQuestionEdit = (type, e) => {
    e.preventDefault();
    // https://github.com/Microsoft/TypeScript/issues/13948
    this.setState({
      ...this.state, // due to the ts dynamic state property issue
      [type]: e.target.value
    });
  }

  public handleQuestionSubmit = (mutate, variables) => () => {
    const confirm = window.confirm('정말로 질문을 작성하시겠습니까?');
    if (confirm) {
      mutate({ variables });
    }
  }

  public handleMutationUpdate = (cache, { data: { addQuestion } }) => {
    const { questions } = cache.readQuery({ query: GET_QUESTIONS });
    cache.writeQuery({
      query: GET_QUESTIONS,
      data: {
        questions: [
          {
            ...addQuestion,
            answerLength: addQuestion.answers.length
          },
          ...questions,
        ]
      }
    });
  }

  public handleMutationCompleted = () => {
    alert('질문이 성공적으로 등록되었습니다.');
    this.setState({ question: '', contents: '' });
  }

  public renderQuestions() {
    return (
      <Query query={GET_QUESTIONS}>
        {
          ({ error, loading, data }) => {
            if (error) { return null };
            if (loading) { return null };
            const { questions } = data;
            return questions.map((item) => {
              const { id, question, contents, answerLength } = item;
              return (
                <QuestionPanel
                  key={id}
                  id={id}
                  question={question}
                  username={'Example'}
                  date={new Date()}
                  contents={contents}
                  answerLength={answerLength}
                />
              );
            });
          }
        }
      </Query>
    );
  }

  public renderQuestionEditor() {
    const { question, contents } = this.state;
    return (
      <Mutation
        mutation={ADD_QUESTION}
        update={this.handleMutationUpdate}
        onCompleted={this.handleMutationCompleted}
      >
        {(mutate) => {
          return (
            <QuestionEditor
              question={question}
              contents={contents}
              onEdit={this.handleQuestionEdit}
              onSubmit={this.handleQuestionSubmit(mutate, { question, contents })}
            />
          );
        }}
      </Mutation>
    );
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
            <Col span={8}>
              {this.renderQuestionEditor()}
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

export default Questions;
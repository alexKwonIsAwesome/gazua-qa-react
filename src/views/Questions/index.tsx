import * as React from 'react';
import styled from '../../styled-components';
import { Row, Col } from 'antd';
import { Query, Mutation } from 'react-apollo';

import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Infinite from '../../components/Infinite';
import QuestionPanel from '../../components/QuestionPanel';
import QuestionEditor from '../../components/QuestionEditor';

import {
  GET_QUESTIONS,
  ADD_QUESTION,
} from './queries';

interface IState {
  question: string;
  contents: string;
  offset: number;
  limit: number;
  fetchedAll: boolean;
}

class Questions extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      contents: '',
      offset: 0,
      limit: 10,
      fetchedAll: false,
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
    const { offset, limit } = this.state;
    const { questions } = cache.readQuery({
      query: GET_QUESTIONS,
      variables: { offset, limit }
    });
    cache.writeQuery({
      query: GET_QUESTIONS,
      variables: { offset, limit },
      data: {
        questions: [
          {
            ...addQuestion,
            answersLength: addQuestion.answers.length
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

  public handleInfiniteLoad = (fetchMore, questions) => () => {
    fetchMore({
      variables: {
        offset: questions.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        if (fetchMoreResult.questions && fetchMoreResult.questions.length < 10) {
          this.setState({ fetchedAll: true });
        }
        return {
          ...prev,
          questions: [ ...prev.questions, ...fetchMoreResult.questions ]
        }
      }
    });
  }

  public renderQuestions() {
    const { offset, limit, fetchedAll } = this.state;
    return (
      <Query
        query={GET_QUESTIONS}
        variables={{ offset, limit }}
        notifyOnNetworkStatusChange={true}
      >
        {
          ({ error, loading, data, fetchMore }) => {
            const { questions } = data;
            if (error) { return null };
            if (loading && !Boolean(questions)) { return null };
            return (
              <Infinite
                offset={0}
                loading={loading}
                fetchedAll={fetchedAll}
                onLoad={this.handleInfiniteLoad(fetchMore, questions)}
              >
                {questions.map((item) => {
                  const { id, question, contents, answersLength } = item;
                  return (
                    <QuestionPanel
                      key={id}
                      id={id}
                      question={question}
                      username={'Example'}
                      date={new Date()}
                      contents={contents}
                      answersLength={answersLength}
                    />
                  );
                })}
              </Infinite>
            );
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
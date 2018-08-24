import * as React from 'react';
import styled from '../../styled-components';
import { Row, Col } from 'antd';
import { Query, Mutation } from 'react-apollo';

import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Infinite from '../../components/Infinite';
import QuestionPanel from '../../components/QuestionPanel';

import {
  GET_QUESTIONS,
} from './queries';

interface IState {
  offset: number;
  limit: number;
  fetchedAll: boolean;
}

class Answers extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      limit: 10,
      fetchedAll: false,
    }
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
        variables={{ offset, limit, answers: 'none' }}
        notifyOnNetworkStatusChange={true}
      >
        {
          ({ error, loading, data, refetch, fetchMore }) => {
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
                  const { id, question, contents, answersLength, updatedAt } = item;
                  return (
                    <QuestionPanel
                      key={id}
                      id={id}
                      question={question}
                      username={'Example'}
                      date={updatedAt}
                      contents={contents}
                      answersLength={answersLength}
                    />
                  );
                })}
              </Infinite>
            )
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
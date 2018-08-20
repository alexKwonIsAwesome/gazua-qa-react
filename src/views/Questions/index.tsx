import * as React from 'react';
import styled from '../../styled-components';
import { Row, Col } from 'antd';
import { Query } from 'react-apollo';

import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import QuestionPanel from '../../components/QuestionPanel';
import QuestionEditor from '../../components/QuestionEditor';

import { QUESTIONS } from './queries';

class Questions extends React.Component {
  public renderQuestions() {
    return (
      <Query query={QUESTIONS}>
        {
          ({ error, loading, data }) => {
            if (error) { return null };
            if (loading) { return null };
            const { questions } = data;
            return questions.map((item) => {
              const { id, question, contents } = item;
              return (
                <QuestionPanel
                  key={id}
                  id={id}
                  question={question}
                  username={'Example'}
                  date={new Date()}
                  contents={contents}
                  repliesLength={3}
                />
              )
            })
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
            <Col span={8}>
              <QuestionEditor />
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

export default Questions;
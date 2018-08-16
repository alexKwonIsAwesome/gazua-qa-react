import * as React from 'react';
import styled from '../../styled-components';
import { Row, Col } from 'antd';

import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import QuestionPanel from '../../components/QuestionPanel';
import CommentsPanel from '../../components/CommentsPanel';
import AnswerEditor from '../../components/AnswerEditor';

class QuestionInstance extends React.Component {
  public render() {
    return (
      <Wrapper>
        <Navbar />
        <Container>
          <Row gutter={16}>
            <Col span={16}>
              <QuestionPanel
                id={"1"}
                question={"오늘은 어떤 하루?"}
                username="가즈아"
                date={new Date()}
                contents="비트코인 다시 상승하는 모습 보여주네요 ㅋㅋ 다양한 정보 많이 찾아보시면서 실시간 대응하셔도 좋을듯 제가 공부해보니까 알트는 함부로 가지고 있는다고 답은 아니더라고요"
              />
              <CommentsPanel
                comments={[
                  {
                    id: '1',
                    username: 'homuru',
                    date: new Date(),
                    content: '오예 오늘은 어때!'
                  },
                  {
                    id: '2',
                    username: 'homuru',
                    date: new Date(),
                    content: '오예 오늘은 어때!'
                  },
                  {
                    id: '3',
                    username: 'homuru',
                    date: new Date(),
                    content: '오예 오늘은 어때!'
                  }
                ]}
              />
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
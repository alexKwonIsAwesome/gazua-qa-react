import gql from 'graphql-tag';

export const GET_QUESTION = gql`
  query Question($id: ID!) {
    question(id: $id) {
      id
      question
      contents
      answerLength
    }
  }
`;

export const GET_ANSWERS = gql`
  query Question($id: ID!) {
    question(id: $id) {
      id
      answerLength
      answers {
        id
        questionId
        contents
      }
    }
  }
`;

export const ADD_ANSWER = gql`
  mutation AddAnswer($questionId: ID!, $contents: String!) {
    addAnswer(questionId: $questionId, contents: $contents) {
      id
      contents
      questionId
    }
  }
`;
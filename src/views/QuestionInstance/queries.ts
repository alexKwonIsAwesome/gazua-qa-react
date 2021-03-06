import gql from 'graphql-tag';

export const GET_QUESTION = gql`
  query Question($id: ID!) {
    question(id: $id) {
      id
      question
      contents
      answersLength
      createdAt
      updatedAt
    }
  }
`;

export const GET_ANSWERS = gql`
  query Question($id: ID!) {
    question(id: $id) {
      id
      answersLength
      answers {
        id
        questionId
        contents
      }
      createdAt
      updatedAt
    }
  }
`;

export const ADD_ANSWER = gql`
  mutation AddAnswer($questionId: ID!, $contents: String!) {
    addAnswer(questionId: $questionId, contents: $contents) {
      id
      contents
      questionId
      createdAt
      updatedAt
    }
  }
`;
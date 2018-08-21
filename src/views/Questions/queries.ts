import gql from 'graphql-tag';

export const GET_QUESTIONS = gql`
  query {
    questions {
      id
      question
      contents
      answerLength
    }
  }
`;
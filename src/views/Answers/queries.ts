import gql from 'graphql-tag';

export const GET_QUESTIONS = gql`
  query getQuestions($offset: Int!, $limit: Int!, $answers: String) {
    questions(offset: $offset, limit: $limit, answers: $answers) {
      id
      question
      contents
      answersLength
      createdAt
      updatedAt
    }
  }
`;
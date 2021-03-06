import gql from 'graphql-tag';

export const GET_QUESTIONS = gql`
  query getQuestions($offset: Int!, $limit: Int!) {
    questions(offset: $offset, limit: $limit) {
      id
      question
      contents
      answersLength
      createdAt
      updatedAt
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation AddQuestion($question: String!, $contents: String!) {
    addQuestion(question: $question, contents: $contents) {
      id
      question
      contents
      answers {
        id
        contents
      }
      createdAt
      updatedAt
    }
  }
`;
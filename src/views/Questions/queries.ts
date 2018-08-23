import gql from 'graphql-tag';

export const GET_QUESTIONS = gql`
  query getQuestions($offset: Int!, $limit: Int!) {
    questions(offset: $offset, limit: $limit) {
      id
      question
      contents
      answerLength
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
    }
  }
`;
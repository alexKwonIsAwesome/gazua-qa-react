import gql from 'graphql-tag';

export const QUESTIONS = gql`
  query {
    questions {
      id
      question
      contents
    }
  }
`;
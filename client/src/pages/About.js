import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_MESSAGE = gql`
  query {
    message
    externalData
  }
`;

const About = () => {
  const { loading, error, data } = useQuery(GET_MESSAGE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>About Page - GraphQL Data</h2>
      <p>{data.message}</p>
      <ul>
        {data.externalData.slice(0, 5).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default About;

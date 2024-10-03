import React from 'react';

const FormTwo: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <iframe
        src="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAf9rZzVUQ0VINTBGNlRDN1dRRDJHSTdLTjVYMUZKUC4u&embed=true"
        width="640"
        height="480"
        frameBorder="0"
        allowFullScreen
        title="Form Two"></iframe>
    </div>
  );
};

export default FormTwo;

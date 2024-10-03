import React from 'react';

const FormOne: React.FC = () => {
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
        src="https://forms.office.com/Pages/ResponsePage.aspx?id=form-one-id"
        width="640"
        height="480"
        frameBorder="0"
        allowFullScreen
        title="Form One"></iframe>
    </div>
  );
};

export default FormOne;

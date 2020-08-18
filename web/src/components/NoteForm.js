import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  height: 100%;
`;
const Form = styled.form`
  height: 100%;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
  resize: none;
`;

const NoteForm = props => {
  const [values, setValues] = useState({ content: props.content || '' });
  const onChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };
  console.log('clog', values);

  return (
    <Wrapper>
      <Form
        onSubmit={e => {
          e.preventDefault();
          props.action({
            variables: { ...values }
          });
        }}
      >
        <TextArea
          required
          type="text"
          name="content"
          id="newNote"
          value={values.content}
          placeholder="New note..."
          onChange={onChange}
        />
        <Button type="submit">Create</Button>
      </Form>
    </Wrapper>
  );
};

export default NoteForm;

/* eslint-disable no-console */
import React, { useState } from 'react';
import './CommentForm.scss';
import { FormDataType } from '../../types/FormDataType';
import { commentsApi } from '../../api/comments';

interface Props {
  onSubmitLoadComments: () => Promise<void>;
  onSubmitHideForm?: () => void;
  parentId?: string | null;
}

const initialFormData: FormDataType = {
  userName: '',
  email: '',
  homePage: '',
  message: '',
  parentId: null,
  imageFile: null,
  textFile: null,
};

export const CommentForm: React.FC<Props> = ({
  onSubmitLoadComments,
  onSubmitHideForm,
  parentId = null,
}) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState<FormDataType>(initialFormData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;

    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    const imageFile = files ? files[0] : null;

    if (imageFile) {
      setFormData((prevData) => ({ ...prevData, imageFile }));
    }
  };

  const handleTextFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    const textFile = files ? files[0] : null;

    if (textFile) {
      setFormData((prevData) => ({ ...prevData, textFile }));
    }
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedFormData = { ...formData, parentId };

    console.log('updatedFormData when submitting:', updatedFormData);

    const payload = new FormData();

    Object.entries(updatedFormData).forEach(([key, value]) => {
      if (value !== null) {
        payload.append(key, value);
      }
    });

    await commentsApi.createComment(payload);
    await onSubmitLoadComments();

    if (onSubmitHideForm) {
      onSubmitHideForm();
    }

    setCount((prevCount => prevCount + 1));
    resetFormData();
  };

  return (
    <form className="Form" onSubmit={handleSubmit} key={count}>
      <h2 className="Form__title">Add Your Comment</h2>
      <div className="Form__group">
        <label htmlFor="username" className="Form__label">
          <p className="Form__caption">User Name (required):</p>

          <input
            type="text"
            id="userName"
            required
            pattern="[A-Za-z0-9 ]+"
            className="Form__input"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="Form__group">
        <label htmlFor="email" className="Form__label">
          <p className="Form__caption">E-mail (required):</p>

          <input
            type="email"
            id="email"
            required
            className="Form__input"
            onChange={handleInputChange}
          />
        </label>

      </div>

      <div className="Form__group">
        <label htmlFor="homepage" className="Form__label">
          <p className="Form__caption">Home page (optional):</p>

          <input
            type="url"
            id="homePage"
            className="Form__input"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="Form__group">
        <label htmlFor="message" className="Form__label">
          <p className="Form__caption">Text (required):</p>
        </label>

        <div className="Form__messageBlock">
          <div className="Form__tagPanel">
            <button type="button" className="Form__tagButton" data-tag="i">i</button>
            <button type="button" className="Form__tagButton" data-tag="strong">strong</button>
            <button type="button" className="Form__tagButton" data-tag="code">code</button>
            <button type="button" className="Form__tagButton" data-tag="a">a</button>
          </div>

          <textarea
            id="message"
            required
            className="Form__textarea"
            onChange={handleInputChange}
          >
          </textarea>
        </div>
      </div>

      <div className="Form__group">
        <label htmlFor="imageFile" className="Form__label">
          <p className="Form__caption">
            Upload Image (JPG, GIF, PNG, max 320x240px):
          </p>

          <input
            type="file"
            id="imageFile"
            accept="image/jpeg,image/gif,image/png"
            className="Form__input Form__inputFile"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      <div className="Form__group">
        <label htmlFor="textFile" className="Form__label">
          <p className="Form__caption">
            Upload Text File (TXT, max 100KB):
          </p>

          <input
            type="file"
            id="textFile"
            accept=".txt"
            className="Form__input Form__inputFile"
            onChange={handleTextFileUpload}
          />
        </label>
      </div>

      <button type="submit" className="Form__submitButton">Submit</button>
    </form>
  );
};

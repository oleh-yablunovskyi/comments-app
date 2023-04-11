/* eslint-disable no-console */
import React, { useState } from 'react';
import './CommentForm.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ReCAPTCHA from 'react-google-recaptcha';
import socket from '../../socket';
import { sanitizeMessage } from '../../utils/sanitizeMessage';
import { modules, formats } from './quillConfig';
import { Loader } from '../Loader/Loader';
import { FormDataType } from '../../types/FormDataType';
import { commentsApi } from '../../api/comments';

interface Props {
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
  onSubmitHideForm,
  parentId = null,
}) => {
  const [formData, setFormData] = useState<FormDataType>({ ...initialFormData, parentId });
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(null);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [count, setCount] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleMessageChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, message: value }));
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

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaResponse(value);
  };

  const validateUserName = (value: string) => {
    const isValid = value.match(/^[A-Za-z0-9 ]+$/);

    setIsUserNameValid(!!isValid);
  };

  const validateEmail = (value: string) => {
    const isValid = value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/);

    setIsEmailValid(!!isValid);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!recaptchaResponse) {
      Notify.failure('Please complete the CAPTCHA.', { timeout: 5000 });

      return;
    }

    if (!formData.message) {
      Notify.failure('Please enter a message.', { timeout: 5000 });

      return;
    }

    setIsLoading(true);

    const sanitizedMessage = sanitizeMessage(formData.message);

    const preparedFormData: FormDataType = {
      ...formData,
      message: sanitizedMessage,
    };

    console.log('preparedFormData when submitting:', preparedFormData);

    const payload = new FormData();

    Object.entries(preparedFormData).forEach(([key, value]) => {
      if (value !== null) {
        payload.append(key, value);
      }
    });

    payload.append('recaptchaResponse', recaptchaResponse);

    try {
      const response = await commentsApi.createComment(payload);

      console.log('Comment submitted successfully:', response);

      // Emit event to refresh comments with the new comment data
      socket.emit('new_comment', response);
    } catch (error) {
      Notify.failure('An error occurred while submitting the comment. Please try again.', { timeout: 5000 });
    }

    setCount((prevCount => prevCount + 1));
    resetFormData();
    setIsLoading(false);

    if (onSubmitHideForm) {
      onSubmitHideForm();
    }
  };

  return (
    <>
      {isLoading
        ? (
          <Loader />
        )
        : (
          <form className="Form" onSubmit={handleSubmit} key={count}>
            <h2 className="Form__title">Add Your Comment</h2>
            <div className="Form__group">
              <label htmlFor="username" className="Form__label">
                <p className="Form__caption">
                  User Name
                  <span className="Form__required">*</span>
                </p>

                <input
                  type="text"
                  id="userName"
                  required
                  className={`Form__input ${!isUserNameValid ? 'Form__input--invalid' : ''}`}
                  onChange={handleInputChange}
                  onBlur={(e) => validateUserName(e.target.value)}
                  placeholder="John Doe"
                />
              </label>
            </div>

            <div className="Form__group">
              <label htmlFor="email" className="Form__label">
                <p className="Form__caption">
                  E-mail
                  <span className="Form__required">*</span>
                </p>

                <input
                  type="email"
                  id="email"
                  required
                  // className="Form__input"
                  className={`Form__input ${!isEmailValid ? 'Form__input--invalid' : ''}`}
                  onChange={handleInputChange}
                  onBlur={(e) => validateEmail(e.target.value)}
                  title="Please enter a valid email address (example: johndoe@example.com)"
                  placeholder="johndoe@gmail.com"
                />
              </label>

            </div>

            <div className="Form__group">
              <label htmlFor="homepage" className="Form__label">
                <p className="Form__caption">Home page</p>

                <input
                  type="url"
                  id="homePage"
                  className="Form__input"
                  onChange={handleInputChange}
                  placeholder="https://myhomepage.com/"
                />
              </label>
            </div>

            <div className="Form__group">
              <label htmlFor="message" className="Form__label">
                <p className="Form__caption">
                  Text
                  <span className="Form__required">*</span>
                </p>
              </label>

              <div className="Form__messageBlock">
                <ReactQuill
                  value={formData.message}
                  onChange={handleMessageChange}
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  placeholder="Enter your comment here..."
                />
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

            <div className="Form__captcha">
              <ReCAPTCHA
                sitekey="6LfMP3ElAAAAAOflJaX40X36kjx_xqOh1zVcDimq"
                onChange={handleRecaptchaChange}
              />
            </div>

            <button type="submit" className="Form__submitButton">Submit</button>
          </form>
        )}
    </>
  );
};

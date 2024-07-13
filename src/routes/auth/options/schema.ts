import * as yup from 'yup';

const authProperty = yup.object({
  id: yup.string().required('ID is required'),
  user_id: yup.string().required('User ID is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  fullName: yup.string().required('Full name is required'),
  accessToken: yup.string().required('Access token is required'),
});

export default authProperty;

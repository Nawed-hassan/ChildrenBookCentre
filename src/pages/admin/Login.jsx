import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, login } = useContext(AuthContext) || {}; // ✅ Safe fallback
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    if (!login) {
      toast.error('AuthContext is not available!');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email, password);
      toast.success('Login successful');
    } catch (error) {
      const message = error?.message || 'Login failed';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <h1>Admin Login</h1>
          <p>Enter your credentials to access the admin panel</p>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isSubmitting}
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </LoginForm>

        <BackLink href="/">← Back to website</BackLink>
      </LoginCard>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f1ea;
`;

const LoginCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  padding: 2rem;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.8rem;
    color: #3c2415;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #3c2415;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3c2415;
    box-shadow: 0 0 0 2px rgba(60, 36, 21, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: #3c2415;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: #59372a;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const BackLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 2rem;
  color: #3c2415;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;

import { Button, Container, FormControl, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import { login } from '../../auth/authenticationSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import '../../styles/auth/Login.css';

interface LoginProps extends RouteComponentProps<any> {}

const Login = (props: LoginProps) => {
  const { location } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);

  const { from } = (location.state as any) || {
    from: { pathname: '/', search: location.search },
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);
    const result = await dispatch(login(username, password));
    if (result?.payload?.data) {
      history.push(from);
    }
  };

  return !isAuthenticated ? (
    <div className="body-sign-in">
      <Container>
        <Grid container>
          <Grid item sm={2} md={1} lg={1} />
          <Grid item xs={12} sm={8} md={10} lg={10}>
            <div className="area-login">
              <Grid md={6} sm={12} xs={12}>
                <div className="form-login">
                  <Box>
                    <div className="loginLogo">
                      <img
                        src="https://tuannt-test.mysapogo.com/v2/images/logo_sapo.svg"
                        alt="sapo"
                      />
                    </div>
                    <div className="label">
                      <h1>Trang quản lý banner</h1>
                    </div>
                    <FormControl fullWidth>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Tên đăng nhập"
                        name="username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        autoComplete="username"
                        autoFocus
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        label="Mật khẩu"
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      variant="contained"
                      color="primary"
                      sx={{ my: 2, py: 1.5, width: 300, ml: 8 }}
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      Đăng nhập
                    </Button>
                    {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )}

                    <div className="info">
                      <p>
                        Tổng đài hỗ trợ khách hàng: <span>1900 6750</span>
                        <br />
                        <br />
                        Hỗ trợ khách hàng các ngày trong tuần từ thứ 2 đến Chủ nhật
                        {'('}từ 8h00 – 22h00 hàng ngày{')'}
                      </p>
                    </div>
                  </Box>
                </div>
              </Grid>
            </div>
          </Grid>
          <Grid item sm={2} md={1} lg={1} />
        </Grid>
      </Container>
    </div>
  ) : (
    <Redirect to={from} />
  );
};

export default Login;

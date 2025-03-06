"use client";

import { Provider as ReduxProvider, useSelector } from "react-redux";
import CardRepository from "@/components/CardRepository";
import Collapsible from "@/components/Collapsible";
import { AppDispatch, RootState, store } from "@/store";
import { userSearch } from "@/store/reducers/users/reducer";
import { Box, Button, Card, CardContent, Grid2, Skeleton, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { User } from "@/store/reducers/users/interface";
import { useState } from "react";
import { userRepos } from "@/store/reducers/repos/reducer";
import { Repo, UserRepos } from "@/store/reducers/repos/interface";
import RequestFailed from '@/components/RequestFailed/index';

export default function UserGit() {
  const dispatch = useDispatch<AppDispatch>();
  const [loadUser, setLoadUser] = useState(false);
  const [loadRepo, setLoadRepo] = useState('');
  const [userState, setUserState] = useState('');

  const users = useSelector((state: RootState) => state.Users);
  const repos = useSelector((state: RootState) => state.Repos);
  const usersList = useSelector((state: RootState) => state.Users.data.items);
  const userReposList: Record<string, UserRepos> = useSelector((state: RootState) => state.Repos.userRepos);

  const initialValues = {
    user_git: '',
  };

  const schemaValidation = Yup.object().shape({
    user_git: Yup.string().required('Username git is required.'),
  });

  const formHandler = (values: { user_git: string }) => {
    setLoadUser(true);
    dispatch(userSearch({ username: values.user_git }))
    .then(() => {
      setLoadUser(false);
      setUserState(values.user_git)
    })
    .catch(() => {
      setLoadUser(false);
      setUserState('')
    });
  }

  const getRepos = (username: string) => {
    setLoadRepo(username)
    dispatch(userRepos({ username }))
    .then(() => {
      setLoadRepo('');
    })
    .catch(() => {
      setLoadRepo('');
    });
  }

  return (
    <ReduxProvider store={store}>
      <Grid2 container spacing={2} sx={{ height: "100vh", justifyContent: 'center', alignItems: 'center' }}>
        <Grid2 size={{ xs: 11, sm: 8, md: 4 }}>
        <Card sx={{ height: '80vh', border: 5, borderColor: 'primary.main', width: '100%' }}>
          <CardContent>
        <Formik initialValues={initialValues} validationSchema={schemaValidation} onSubmit={async (values) => {
              formHandler(values);
            }}>
          {({ values, setFieldValue, handleSubmit, touched, errors }) => (
            <form onSubmit={handleSubmit}>
            <TextField variant="outlined" onChange={(e) => {
              setFieldValue('user_git', e.target.value);
            }} value={values.user_git} label="Enter Username" fullWidth sx={{ backgroundColor: 'grey.200', mb: 1 }} 
            error={Boolean(touched.user_git && errors.user_git)}
            />
            {Boolean(touched.user_git && errors.user_git) && (
            <Typography variant="subtitle2" sx={{ mt: -1, mb: 2, color: 'error.main' }}>
              {errors.user_git}
            </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>Search</Button>
            {userState === '' && (
            <Typography variant="subtitle2" sx={{ mt: 1, color: 'grey.600' }}>
              Search in the input field above to find user
            </Typography>
            )}
            {userState !== '' && (
            <Typography variant="subtitle2" sx={{ mt: 1, color: 'grey.600' }}>
              Showing users for `{userState}`
            </Typography>
            )}
            </form>
              )}
        </Formik>

            <hr style={{marginTop: 20, marginBottom: 20}} />
            {users.status === 'Failed' && <RequestFailed />}
            {loadUser && Array.from({ length: 5 }, (_, index) => (
              <Skeleton sx={{marginBottom: -2}} key={index} height={80} />
            ))}
            {!loadUser && (
              <Box sx={{ overflowY: 'auto', maxHeight: { xs: 'calc(100vh - 390px)', sm: 'calc(100vh - 400px)', md: 'calc(100vh - 320px)', lg: 'calc(100vh - 340px)', xl: 'calc(100vh - 370px)' } }}>
                {usersList.map((user: User, key: number) => (
                  <Collapsible key={key} onClickFunction={() => getRepos(user.login)} title={user.login} sx={{ borderLeft: 4, borderColor: 'primary.main', mb: 2 }} >
                    {loadRepo === user.login && Array.from({ length: 5 }, (_, index) => (
                      <Skeleton key={index} height={60} />
                    ))}
                    {loadRepo !== user.login && (
                      <>
                      {repos.status === 'Failed' && <RequestFailed />}
                      {userReposList[user.login]?.items.map((repo: Repo, key: number) => (
                        <CardRepository key={key} sx={{ ml: 3, mt: 1.5, mb: 1.5, borderLeft: 4, borderColor: 'warning.main' }} title={repo.name} description={repo.description} stargazers_count={repo.stargazers_count} />
                      ))}
                      {userReposList[user.login]?.total_count === 0 && (
                        <Typography variant="subtitle2" sx={{ mb: 2, textAlign: 'center', color: 'grey.600' }}>
                          No repositories found
                        </Typography>
                      )}
                      </>
                    )}
                  </Collapsible>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
        </Grid2>
      </Grid2>
    </ReduxProvider>
  );
}

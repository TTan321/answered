import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Homepage from './components/homepage/Homepage';
import UsersQuestions from './components/questions/UsersQuestions';
import ProfilePage from './components/profile/ProfilePage';
import QuestionDetailsPage from './components/questions/QuestionsDetailsPage';
import AnswerFeed from './components/answerFeed/AnswerFeed';
import TagFeed from './components/tags/TagFeed';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <Homepage />
        </ProtectedRoute>
        <ProtectedRoute path='/answer' exact={true} >
          <AnswerFeed />
        </ProtectedRoute>
        <ProtectedRoute path='/tag/:tagId' exact={true} >
          <TagFeed />
        </ProtectedRoute>
        <ProtectedRoute path='/question/:questionId' exact={true} >
          <QuestionDetailsPage />
        </ProtectedRoute>
        <ProtectedRoute path='/user/:userId' exact={true} >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/questions' exact={true} >
          <UsersQuestions />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

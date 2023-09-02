import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import _ from 'lodash';
import type { NextPage } from 'next';

import { GET_USER_BY_ID, GET_WORDS } from '../queries';
import { TableBody } from '../types';
import Button from '../components/button';
import Table from '../components/table';

const Home: NextPage = () => {
  return <div>You have logged in</div>;
};

export default Home;
